import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleResultPre from '@/app/styles/preResultStyle';
import { model } from '../../../geminiConfig'; 
import { auth, db } from '../../../firebaseConfig'; 
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'; 

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [feedbackIA, setFeedbackIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);
  const [loadingGeral, setLoadingGeral] = useState(false);
  
  const [acertos, setAcertos] = useState(0);
  const [total, setTotal] = useState(0);
  const erros = total - acertos;

  useEffect(() => {
    const inicializar = async () => {
      const user = auth.currentUser;
      if (!user) return;

      if (params.acertos !== undefined) {
        setAcertos(Number(params.acertos));
        setTotal(Number(params.total));
        if (Number(params.total) - Number(params.acertos) > 0 && params.errosData && feedbackIA === '') {
          gerarESalvarFeedback(params.errosData as string, user.uid);
        }
      } else {
        carregarDoBanco(user.uid);
      }
    };
    inicializar();
  }, [params.acertos]);

  const carregarDoBanco = async (uid: string) => {
    setLoadingGeral(true);
    try {
      const q = query(collection(db, "usuarios"), where("uid", "==", uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const dados = snap.docs[0].data();
        setAcertos(dados.notas?.pre_teste || 0);
        setTotal(dados.notas?.total_pre_teste || 4); 
        setFeedbackIA(dados.notas?.feedback_pre_teste || "Feedback disponível apenas após o teste.");
      }
    } finally {
      setLoadingGeral(false);
    }
  };

  const gerarESalvarFeedback = async (errosDataStr: string, uid: string) => {
    if (loadingIA) return;
    setLoadingIA(true);
    try {
      const listaErros = JSON.parse(errosDataStr);
      
      const prompt = `O aluno errou estas questões de BLS: ${listaErros.join(', ')}. 
      Para cada erro, cite o enunciado da pergunta, dê a resposta correta e um feedback curto. 
      NÃO use negrito, asteriscos (*) ou qualquer formatação especial. Apenas texto puro.`;
      
      const result = await model.startChat({ history: [] }).sendMessage(prompt);
      const textoIA = result.response.text();
      
      const textoLimpo = textoIA.replace(/\*/g, '');
      
      setFeedbackIA(textoLimpo);

      const q = query(collection(db, "usuarios"), where("uid", "==", uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        await updateDoc(doc(db, "usuarios", snap.docs[0].id), {
          "notas.feedback_pre_teste": textoLimpo
        });
      }
    } catch (e) {
      setFeedbackIA("Erro ao gerar feedback.");
    } finally {
      setLoadingIA(false);
    }
  };

  return (
    <View style={styleResultPre.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        <View style={styleResultPre.headerSection}>
          <TouchableOpacity style={styleResultPre.headerLeftButton} onPress={() => router.replace('/(auth)/(tabs)')}>
            <Ionicons name="close-outline" size={45} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={require('../../../assets/images/logoof.png')} style={styleResultPre.logo} resizeMode="contain" />
        </View>

        {loadingGeral ? (
          <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#FFFFFF" /></View>
        ) : (
          <ScrollView style={styleResultPre.bodySection} contentContainerStyle={styleResultPre.bodyContent}>
            <View style={styleResultPre.resultCard}>
              <View style={styleResultPre.iconCircle}>
                <Ionicons name="clipboard-outline" size={50} color="#4A0000" />
                <Ionicons name="checkmark" size={30} color="#4A0000" style={{ position: 'absolute' }} />
              </View>
              <Text style={styleResultPre.title}>Resultado do Pré-teste</Text>
              <View style={styleResultPre.scoreContainer}>
                <Text style={styleResultPre.scoreLabel}>Acertos: {acertos} / {total}</Text>
                <Text style={[styleResultPre.scoreLabel, { color: erros > 0 ? '#d63031' : '#4A0000' }]}>Erros: {erros}</Text>
              </View>
              {erros > 0 && (
                <View style={styleResultPre.replyBox}>
                  <Text style={styleResultPre.replyHeader}>✔ CORREÇÃO TÉCNICA (IA):</Text>
                  {loadingIA ? <ActivityIndicator size="small" color="#27ae60" /> : <Text style={styleResultPre.replyText}>{feedbackIA}</Text>}
                </View>
              )}
              <View style={styleResultPre.buttonContainer}>
                <TouchableOpacity style={styleResultPre.button} onPress={() => router.replace('/(auth)/(tabs)')}>
                  <Text style={styleResultPre.buttonText}>Ir para os Módulos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}