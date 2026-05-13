import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import stylePlayer from '@/app/styles/playerStyle';

export default function VideoPlayer() {
  const { id, url_video, titulo, descricao, url_imagem } = useLocalSearchParams();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);

  useEffect(() => {
    const carregarQuestoes = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "micromodulos", String(id));
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setQuestoes(snap.data().questoes || []);
        }
      } catch (e) { console.error("Erro ao carregar quiz:", e); }
    };
    carregarQuestoes();
    setCurrentStep(0);
    setLoading(false);
  }, [id]);

  const imageUri = useMemo(() => {
    if (!url_imagem) return null;
    try {
      const decoded = decodeURIComponent(String(url_imagem)).trim();
      const parts = decoded.split('/o/');
      if (parts.length < 2) return decoded;
      const pathAndParams = parts[1].split('?');
      const fixedPath = pathAndParams[0].replace(/\//g, '%2F');
      return `${parts[0]}/o/${fixedPath}${pathAndParams[1] ? '?' + pathAndParams[1] : ''}`;
    } catch (e) { return String(url_imagem); }
  }, [url_imagem]);

  const updateFirebaseProgress = async (stepValue: number | boolean) => {
    try {
      const user = auth.currentUser;
      if (user && user.email && id) {
        const q = query(collection(db, "usuarios"), where("email", "==", user.email));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const userDoc = snap.docs[0];
          const userData = userDoc.data();
          const currentProgress = userData.progresso?.[String(id)];
          if (currentProgress === true && stepValue !== true) return; 
          const userRef = doc(db, "usuarios", userDoc.id);
          await updateDoc(userRef, { [`progresso.${id}`]: stepValue });
        }
      }
    } catch (e) { console.error("Erro ao atualizar progresso:", e); }
  };

  const validarQuizEFinalizar = async () => {
    if (respostaSelecionada === null) {
      Alert.alert("Atenção", "Selecione uma resposta antes de continuar.");
      return;
    }

    if (respostaSelecionada === questoes[0].correta) {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (user && user.email) {
          const q = query(collection(db, "usuarios"), where("email", "==", user.email));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const userDoc = snap.docs[0];
            const userData = userDoc.data();
            const userRef = doc(db, "usuarios", userDoc.id);

            const novoProgresso = { ...(userData.progresso || {}), [String(id)]: true };
            const lessonsSnap = await getDocs(collection(db, "micromodulos"));
            const totalAulas = lessonsSnap.size;
            const concluidas = Object.entries(novoProgresso).filter(([key, value]) => 
              value === true && key !== 'concluido' && key !== 'data_liberacao_pos_teste'
            ).length;

            let updates: any = { [`progresso.${id}`]: true };

            if (concluidas >= totalAulas && totalAulas > 0) {
              const dataLiberacao = new Date();
              dataLiberacao.setDate(dataLiberacao.getDate() + 90);
              updates["progresso.concluido"] = true;
              updates["progresso.data_liberacao_pos_teste"] = dataLiberacao.toISOString();
              await updateDoc(userRef, updates);
              Alert.alert("Parabéns!", "Você concluiu toda a teoria! Seu Pós-Teste será liberado em 90 dias.", [{ text: "OK", onPress: () => router.back() }]);
            } else {
              await updateDoc(userRef, updates);
              Alert.alert("Excelente!", "Módulo concluído. Continue sua trilha!", [{ text: "OK", onPress: () => router.back() }]);
            }
          }
        }
      } catch (e) { Alert.alert("Erro", "Falha ao salvar progresso."); } finally { setLoading(false); }
    } else {
      Alert.alert("Ops!", "Resposta incorreta. Tente novamente.");
      setRespostaSelecionada(null);
    }
  };

  const handleNext = async () => {
    const totalSteps = questoes.length > 0 ? 3 : 2;
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateFirebaseProgress(nextStep);
    } else {
      if (questoes.length > 0) { validarQuizEFinalizar(); } 
      else {
        setLoading(true);
        await updateFirebaseProgress(true);
        router.back();
      }
    }
  };

  return (
    <View style={stylePlayer.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        
        <View style={stylePlayer.headerSection}>
          <TouchableOpacity style={stylePlayer.headerLeftButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={require('../../../assets/images/logoof.png')} style={stylePlayer.logoHeader} resizeMode="contain" />
        </View>

        <View style={stylePlayer.bodySection}>
          <View style={stylePlayer.headerRow}>
            <Text style={stylePlayer.title} numberOfLines={1}>{titulo}</Text>
          </View>

          <View style={stylePlayer.contentCard}>
            {currentStep === 0 && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={stylePlayer.labelRow}>
                  <Ionicons name="reader-outline" size={20} color="#4A0000" />
                  <Text style={stylePlayer.label}>Teoria</Text>
                </View>
                <Text style={stylePlayer.descText}>{descricao}</Text>
              </ScrollView>
            )}

            {currentStep === 1 && (
              <View style={{ flex: 1 }}>
                <View style={stylePlayer.labelRow}>
                  <Ionicons name="eye-outline" size={20} color="#4A0000" />
                  <Text style={stylePlayer.label}>Esquema Visual</Text>
                </View>
                <View style={stylePlayer.imageWrapper}>
                  {imageUri ? <Image source={{ uri: imageUri }} style={stylePlayer.image} resizeMode="contain" /> : <Text>Sem imagem</Text>}
                </View>
              </View>
            )}

            {currentStep === 2 && (
              <View style={{ flex: 1 }}>
                <View style={stylePlayer.labelRow}>
                  <Ionicons name="videocam-outline" size={20} color="#4A0000" />
                  <Text style={stylePlayer.label}>Vídeo Prático</Text>
                </View>
                <View style={stylePlayer.videoContainer}>
                  <WebView 
                    source={{ uri: `${url_video}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&controls=1` }} 
                    style={{ flex: 1, backgroundColor: '#000' }} 
                    javaScriptEnabled={true} 
                    domStorageEnabled={true} 
                    allowsFullscreenVideo={true}
                    injectedJavaScript={`
                      const style = document.createElement('style');
                      style.innerHTML = '.ytp-chrome-top, .ytp-show-cards-title, .ytp-pause-overlay, .ytp-watermark { display: none !important; }';
                      document.head.appendChild(style);
                      true;
                    `}
                  />
                </View>
              </View>
            )}

            {currentStep === 3 && questoes.length > 0 && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={stylePlayer.labelRow}>
                  <Ionicons name="help-circle-outline" size={20} color="#4A0000" />
                  <Text style={stylePlayer.label}>Mini Quiz</Text>
                </View>
                <Text style={[stylePlayer.descText, {fontWeight: 'bold', marginBottom: 20}]}>{questoes[0].pergunta}</Text>
                {questoes[0].opcoes.map((opcao: string, index: number) => (
                  <TouchableOpacity key={index} onPress={() => setRespostaSelecionada(index)} style={[stylePlayer.optionButton, respostaSelecionada === index && stylePlayer.optionSelected]}>
                    <Text style={[stylePlayer.optionText, respostaSelecionada === index && stylePlayer.optionTextSelected]}>{opcao}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          <TouchableOpacity style={stylePlayer.actionButton} onPress={handleNext} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : (
              <Text style={stylePlayer.buttonText}>
                {currentStep === (questoes.length > 0 ? 3 : 2) ? "CONCLUIR AULA" : "PRÓXIMO PASSO"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}