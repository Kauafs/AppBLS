import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, addDoc, collection, Timestamp, query, where, getDocs, updateDoc, limit } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import styleExec from '@/app/styles/execStyle';

export default function ExecSimulacao() {
  const { id, titulo } = useLocalSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0); 
  const [acertos, setAcertos] = useState(0);
  const [tempoInicio, setTempoInicio] = useState(Date.now());

  
  useEffect(() => {
    let isMounted = true; 

    const carregarCenario = async () => {
      if (!id) return;

      setLoading(true);
      setIndiceAtual(0);
      setAcertos(0);
      setTempoInicio(Date.now());
      setQuestoes([]); 

      try {
        const docRef = doc(db, "simulacoes", String(id));
        const snap = await getDoc(docRef);
        
        if (isMounted) {
          if (snap.exists()) {
            const data = snap.data();
            setQuestoes(data.questoes || []);
          } else {
            Alert.alert("Erro", "Cenário não encontrado.");
            router.back();
          }
        }
      } catch (error) {
        console.error("Erro ao carregar:", error);
        if (isMounted) Alert.alert("Erro", "Falha ao carregar dados.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    carregarCenario();

    return () => { isMounted = false; }; 
  }, [id]); 

  const responder = async (indiceEscolhido: number) => {
    const questaoAtual = questoes[indiceAtual];
    const eCorreta = questaoAtual.correta === indiceEscolhido;
    const novosAcertos = eCorreta ? acertos + 1 : acertos;

    if (indiceAtual + 1 < questoes.length) {
      setAcertos(novosAcertos);
      setIndiceAtual(indiceAtual + 1);
    } else {
      const tempoFinal = (Date.now() - tempoInicio) / 1000; 
      const aderencia = novosAcertos / questoes.length;
      await salvarEFinalizar(aderencia, tempoFinal);
    }
  };

  const salvarEFinalizar = async (aderencia: number, tempo: number) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      
      
      const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid), limit(1));
      const userSnap = await getDocs(qUser);
      if (userSnap.empty) return;
      
      const userDoc = userSnap.docs[0];
      const cpfUsuario = userDoc.id; 
      const nomeUsuario = userDoc.data().nome_completo;

      const aprovado = aderencia === 1.0;

      const dadosParaSalvar = {
        id_participante: cpfUsuario,
        id_simulacao: id,
        titulo_simulacao: titulo,
        nome: nomeUsuario,
        cpf: cpfUsuario,
        atividade_virtual: true,
        aderencia_protocolo: Number(aderencia.toFixed(2)),
        tempo_compressao: Number(tempo.toFixed(2)),
        status_pratica: aprovado,
        status_email: aprovado ? "Pendente" : "Falha",
        data_aprovacao: Timestamp.now(),
      };

      
      const qExistente = query(
        collection(db, "resultados_simulacao"),
        where("id_participante", "==", cpfUsuario),
        where("id_simulacao", "==", id)
      );
      const snapExistente = await getDocs(qExistente);

      if (!snapExistente.empty) {
        await updateDoc(doc(db, "resultados_simulacao", snapExistente.docs[0].id), dadosParaSalvar);
      } else {
        await addDoc(collection(db, "resultados_simulacao"), dadosParaSalvar);
      }

      if (aprovado) {
        
        const snapAtivas = await getDocs(query(collection(db, "simulacoes"), where("ativo", "==", true)));
        const totalAtivas = snapAtivas.size;
        
        const snapResultados = await getDocs(query(
          collection(db, "resultados_simulacao"),
          where("id_participante", "==", cpfUsuario),
          where("aderencia_protocolo", "==", 1)
        ));
        
        const totalConcluidas = snapResultados.size;

        if (totalConcluidas >= totalAtivas) {
          router.replace("/screens/presencial/convite"); 
        } else {
          Alert.alert("Cenário Concluído!", "100% atingido. Continue para os demais.", [
            { text: "OK", onPress: () => router.replace("/(auth)/(tabs)/simulation") }
          ]);
        }
      } else {
        Alert.alert("Simulação Finalizada", `Resultado: ${Math.round(aderencia * 100)}%\n\nVocê precisa de 100% para concluir.`, [
          { text: "Tentar de novo", onPress: () => { setIndiceAtual(0); setAcertos(0); setTempoInicio(Date.now()); }}
        ]);
      }
    } catch (e) { console.error(e); }
  };

  
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#4A0000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  
  if (questoes.length === 0 || !questoes[indiceAtual]) return null;

  return (
    <View key={String(id)} style={styleExec.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      <View style={styleExec.headerSection}>
        <TouchableOpacity style={styleExec.headerLeftButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={45} color="#FFFFFF" />
        </TouchableOpacity>
        <Image source={require('../../../assets/images/logoof.png')} style={styleExec.logo} resizeMode="contain" />
        <TouchableOpacity style={styleExec.headerRightButton} onPress={() => router.push('/perfil')}>
          <Ionicons name="person-circle-outline" size={45} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styleExec.bodySection}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4A0000', textAlign: 'center', marginVertical: 20 }}>{titulo}</Text>
          {questoes[indiceAtual].imagem && <Image source={{ uri: questoes[indiceAtual].imagem }} style={styleExec.simulacaoImage} resizeMode="cover" />}
          <Text style={styleExec.perguntaText}>Questão {indiceAtual + 1} de {questoes.length}:{"\n"}{questoes[indiceAtual].pergunta}</Text>
          {questoes[indiceAtual].opcoes.map((opcao: string, i: number) => (
            <TouchableOpacity key={i} style={styleExec.opcaoCard} onPress={() => responder(i)}>
              <Text style={styleExec.opcaoText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}