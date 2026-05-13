import React, {  useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { collection, query, where, getDocs, doc, updateDoc, limit } from 'firebase/firestore'; 
import { auth, db } from '../../../firebaseConfig'; 
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleQuiz from '../../styles/quizStyle'; 

export default function ExecPosteste() {
  const router = useRouter();
  const user = auth.currentUser;

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});

  const embaralhar = (array: any[]) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchQuiz = async () => {
        if (!user) return;
        try {
          setCurrentStep(0);
          setAnswers({});
          setLoading(true);

          const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid), limit(1));
          const userSnap = await getDocs(qUser);
          
          if (!userSnap.empty) {
            const userData = userSnap.docs[0].data();
            const tentativas = userData.notas?.tentativas_pos || 0;
            if (tentativas >= 2) {
              Alert.alert("Limite Atingido", "Você já realizou as 2 tentativas permitidas.");
              router.replace('/(auth)/(tabs)/certificacao');
              return;
            }
          }

          const q = query(collection(db, "avaliacoes_pos"));
          const snap = await getDocs(q);
          
          let listaOriginal = snap.docs.map(d => ({ 
            id: d.id, 
            pergunta: d.data().pergunta, 
            ...d.data() 
          }));

          let listaSorteada = embaralhar(listaOriginal);
          const listaFinal = listaSorteada.map(p => {
            const opcoesOriginais = [...p.opcoes];
            const textoCorreto = opcoesOriginais[p.respostacorreta];
            const opcoesEmbaralhadas = embaralhar(opcoesOriginais);
            return {
              ...p,
              opcoes: opcoesEmbaralhadas,
              respostacorreta: opcoesEmbaralhadas.indexOf(textoCorreto)
            };
          });

          setQuestions(listaFinal);
        } catch (error) { 
          console.error("Erro busca pós-teste:", error); 
        } finally { 
          setLoading(false); 
        }
      };
      fetchQuiz();
    }, [user])
  );

  const handleNext = () => {
    if (answers[currentStep] === undefined) {
      Alert.alert("Aviso", "Por favor, selecione uma opção.");
      return;
    }

    const perguntaAtual = questions[currentStep];
    if (answers[currentStep] !== perguntaAtual.respostacorreta && perguntaAtual.erro_critico === true) {
      Alert.alert("ERRO CRÍTICO", "Procedimento incorreto. Teste encerrado.", [
        { text: "Ver Nota", onPress: () => handleFinalize(true) }
      ]);
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalize(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleFinalize = async (isCritico: boolean) => {
    setLoading(true);
    try {
      let acertosRealizados = 0;
      let listaDeErros: string[] = [];

      if (!isCritico) {
        questions.forEach((q, index) => {
          if (answers[index] === q.respostacorreta) {
            acertosRealizados += 1;
          } else {
            listaDeErros.push(q.pergunta);
          }
        });
      } else {
        listaDeErros.push(questions[currentStep].pergunta + " (Erro Crítico de Protocolo)");
      }

      const totalPerguntas = questions.length;
      const notaFinal = isCritico ? 0 : (acertosRealizados / totalPerguntas) * 10;
      const aprovado = notaFinal >= 5.0 && !isCritico;

      if (user) {
        const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(qUser);

        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          const userRef = doc(db, "usuarios", docId);
          const dataDoc = querySnapshot.docs[0].data();
          const tentativasAnteriores = dataDoc.notas?.tentativas_pos || 0;

          await updateDoc(userRef, {
            "notas.pos_teste": acertosRealizados,
            "notas.total_pos_teste": totalPerguntas,
            "notas.tentativas_pos": tentativasAnteriores + 1,
            "status_pos_teste": aprovado ? "aprovado" : "reprovado"
          });

          router.replace({
            pathname: '/screens/result/posResult',  
            params: {
              acertos: acertosRealizados,
              total: totalPerguntas,
              errosData: JSON.stringify(listaDeErros) 
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível finalizar o teste.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || questions.length === 0) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <ActivityIndicator size="large" color="#4A0000" />
    </View>
  );

  return (
    <View style={styleQuiz.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        <View style={styleQuiz.headerSection}>
          <Image source={require('../../../assets/images/img222.png')} style={styleQuiz.logo} resizeMode="contain" />
        </View>

        <View style={styleQuiz.bodySection}>
          <View style={styleQuiz.headerRow}>
            <Text style={styleQuiz.title}>Pós-Teste Teórico</Text>
          </View>

          <View style={styleQuiz.questionCard}>
            <View style={styleQuiz.progressContainer}>
              <View style={styleQuiz.progressStepBadge}>
                <Text style={styleQuiz.progressStepText}>{currentStep + 1}</Text>
              </View>
              <View style={styleQuiz.progressBarBg}>
                <View style={[styleQuiz.progressFill, { width: `${((currentStep + 1) / questions.length) * 100}%` }]} />
              </View>
            </View>

            <Text style={styleQuiz.questionText}>{questions[currentStep].pergunta}</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={styleQuiz.optionsWrapper}>
              {questions[currentStep].opcoes.map((opt: string, idx: number) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styleQuiz.optionRow} 
                  onPress={() => setAnswers({...answers, [currentStep]: idx})}
                  activeOpacity={0.7}
                >
                  <View style={styleQuiz.radioOuter}>
                    {answers[currentStep] === idx && <View style={styleQuiz.radioInner} />}
                  </View>
                  <Text style={styleQuiz.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styleQuiz.footer}>
          <TouchableOpacity style={styleQuiz.navButton} onPress={handlePrevious}>
            <Text style={styleQuiz.navButtonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleQuiz.navButton} onPress={handleNext}>
            <Text style={styleQuiz.navButtonText}>
              {currentStep === questions.length - 1 ? "Finalizar" : "Próxima"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}