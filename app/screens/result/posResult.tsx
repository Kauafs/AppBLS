import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleResultPos from '@/app/styles/proResult'; 
import { model } from '../../../geminiConfig'; 
import { auth, db } from '../../../firebaseConfig'; 
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'; 

export default function PosResultScreen() {
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
          gerarESalvarFeedbackMentor(params.errosData as string, user.uid);
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
        setAcertos(dados.notas?.pos_teste || 0);
        setTotal(dados.notas?.total_pos_teste || 10); 
        setFeedbackIA(dados.notas?.feedback_pos_teste || "Orientações disponíveis após o teste.");
      }
    } catch (error) {
      console.error("Erro ao carregar banco:", error);
    } finally {
      setLoadingGeral(false);
    }
  };

  const gerarESalvarFeedbackMentor = async (errosDataStr: string, uid: string) => {
    if (loadingIA) return;
    setLoadingIA(true);
    try {
      const listaErros = JSON.parse(errosDataStr);
      
      const prompt = `O aluno errou estes temas de BLS: ${listaErros.join(', ')}. 
      NÃO dê as respostas corretas. Diga de forma técnica e curta quais pontos do protocolo ele deve revisar para a prática presencial. 
      NÃO use negrito, asteriscos (*) ou qualquer formatação especial. Apenas texto puro.`;
      
      const result = await model.startChat({ history: [] }).sendMessage(prompt);
      const textoIA = result.response.text();
      
      const textoLimpo = textoIA.replace(/\*/g, '');
      
      setFeedbackIA(textoLimpo);

      const q = query(collection(db, "usuarios"), where("uid", "==", uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        await updateDoc(doc(db, "usuarios", snap.docs[0].id), {
          "notas.feedback_pos_teste": textoLimpo
        });
      }
    } catch (e) {
      console.error("Erro na IA ou Firestore:", e);
      setFeedbackIA("Revise os protocolos de Suporte Básico de Vida para a aula prática.");
    } finally {
      setLoadingIA(false);
    }
  };

  return (
    <View style={styleResultPos.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        
        <View style={styleResultPos.headerSection}>
          <TouchableOpacity 
            style={styleResultPos.headerLeftButton} 
            onPress={() => router.replace('/(auth)/(tabs)')}
          >
            <Ionicons name="close-outline" size={45} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={require('../../../assets/images/logoof.png')} style={styleResultPos.logo} resizeMode="contain" />
        </View>

        {loadingGeral ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <ScrollView style={styleResultPos.bodySection} contentContainerStyle={styleResultPos.bodyContent}>
            <View style={styleResultPos.resultCard}>
              
              <View style={styleResultPos.iconCircle}>
                <Ionicons name="clipboard-outline" size={50} color="#4A0000" />
                <Ionicons name="checkmark" size={30} color="#4A0000" style={{ position: 'absolute' }} />
              </View>
              
              <Text style={styleResultPos.title}>Resultado do Pós-teste</Text>
              
              <View style={styleResultPos.scoreContainer}>
                <Text style={styleResultPos.scoreLabel}>Acertos: {acertos} / {total}</Text>
                <Text style={[styleResultPos.scoreLabel, { color: erros > 0 ? '#d63031' : '#4A0000' }]}>
                  Erros: {erros}
                </Text>
              </View>

              {erros > 0 && (
                <View style={styleResultPos.replyBox}>
                  <Text style={[styleResultPos.replyHeader, { color: '#4A0000' }]}>
                    💡 ORIENTAÇÃO TÉCNICA (IA):
                  </Text>
                  {loadingIA ? (
                    <ActivityIndicator size="small" color="#4A0000" />
                  ) : (
                    <Text style={styleResultPos.replyText}>{feedbackIA}</Text>
                  )}
                </View>
              )}

              <View style={styleResultPos.buttonContainer}>
                <TouchableOpacity 
                  style={styleResultPos.button} 
                  onPress={() => router.replace('/(auth)/(tabs)')}
                >
                  <Text style={styleResultPos.buttonText}>Ir para módulos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}