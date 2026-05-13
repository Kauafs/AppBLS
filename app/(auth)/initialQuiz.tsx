import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore'; 
import { auth, db } from '../../firebaseConfig'; 
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleQuiz from '../styles/quizStyle';

export default function InitialQuiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [answers, setAnswers] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const q = query(collection(db, "avaliacoes"), where("tipo", "==", "nivelamento"), orderBy("ordem", "asc"));
        const snap = await getDocs(q);
        setQuestions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { 
        console.error("Erro busca quiz:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchQuiz();
  }, []);

  const handleNext = () => {
    if (answers[currentStep] === undefined) {
      Alert.alert("Aviso", "Por favor, selecione uma opção.");
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalize();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleFinalize = async () => {
    setLoading(true);
    try {
      let finalScore = 0;
      let errosList: string[] = [];

      questions.forEach((q, index) => {
        const isCorrect = answers[index] === q.respostacorreta;
        if (isCorrect) {
          finalScore += 1;
        } else {
          errosList.push(q.pergunta);
        }
      });

      const user = auth.currentUser;
      if (user) {
        const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(qUser);

        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          const userRef = doc(db, "usuarios", docId);
          
          
          await updateDoc(userRef, {
            "notas.pre_teste": finalScore,
            "notas.total_pre_teste": questions.length, 
            "data_nivelamento": new Date().toISOString()
          });

          router.replace({
            pathname: '/screens/result/preResults',
            params: { 
              acertos: finalScore.toString(), 
              total: questions.length.toString(),
              errosData: JSON.stringify(errosList) 
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível finalizar o quiz.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
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
          <Image 
            source={require('../../assets/images/logoof.png')} 
            style={styleQuiz.logo} 
            resizeMode="contain" 
          />
        </View>

        <View style={styleQuiz.bodySection}>
          <View style={styleQuiz.headerRow}>
            <Text style={styleQuiz.title}>Avaliação Cognitiva</Text>
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
            
            <View style={styleQuiz.optionsWrapper}>
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
            </View>
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