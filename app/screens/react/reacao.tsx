import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../../../firebaseConfig';
import { doc, setDoc, updateDoc, Timestamp, collection, query, where, getDocs, limit } from 'firebase/firestore';
import styleReacao from '@/app/styles/reactStyle';

export default function ReacaoScreen() {
  const router = useRouter();
  const [reacao, setReacao] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleFinalizarTudo = async () => {
    if (reacao === 0) {
      Alert.alert("Aviso", "Por favor, selecione uma nota de 1 a 5.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid), limit(1));
      const qUserSnap = await getDocs(qUser);

      if (qUserSnap.empty) {
        Alert.alert("Erro", "Perfil não localizado.");
        setLoading(false);
        return;
      }

      const userDocSnap = qUserSnap.docs[0];
      const userData = userDocSnap.data();
      const userCPF = userDocSnap.id; 
      const userRef = userDocSnap.ref;

      let praticData = null;
      const qPratica = query(collection(db, "resultados_simulacao"), where("cpf", "==", userCPF), limit(1));
      const qPraticaSnap = await getDocs(qPratica);
      
      if (!qPraticaSnap.empty) {
        praticData = qPraticaSnap.docs[0].data();
      }

      if (praticData) {
        const notaPre = userData.notas?.pre_teste || 0;
        const notaPos = userData.notas?.pos_teste || 0;
        const n2Aprendizagem = notaPos - notaPre; 
        const n3Comportamento = praticData.status_pratica === true; 
        
        const aderencia = praticData.aderencia_protocolo || 0;
        const tempoCompressao = praticData.tempo_compressao || 0;
        
        const scoreGlobal = (notaPos * 0.4) + (aderencia * 10 * 0.4) + (tempoCompressao <= 10 ? 2 : 0);
        const impacto = (scoreGlobal >= 7 && n3Comportamento) ? "Apto" : "Não Apto";

        await setDoc(doc(db, "indicadores_kirkpatrick", user.uid), {
          id_participante: userCPF,
          nivel1_reacao: reacao,
          nivel2_aprendizagem: n2Aprendizagem,
          nivel3_comportamento: n3Comportamento,
          score_global: Number(scoreGlobal.toFixed(2)),
          impacto: impacto,
          data_consolidacao: Timestamp.now()
        });

        await updateDoc(userRef, {
          "progresso.pesquisa_reacao": true,
          "status_final_treinamento": impacto
        });

        Alert.alert("Sucesso!", "Treinamento finalizado com êxito!", [
          { text: "Ver Perfil", onPress: () => router.replace('/(auth)/(tabs)/perfil') }
        ]);
      } else {
        Alert.alert("Pendente", `Prática não encontrada para o CPF: ${userCPF}.`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao processar dados finais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styleReacao.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styleReacao.safeAreaTop} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        
        <View style={styleReacao.headerSection}>
          <TouchableOpacity 
            style={styleReacao.headerLeftButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={styleReacao.logo} 
            resizeMode="contain" 
          />
        </View>

        <View style={styleReacao.bodySection}>
          <View style={styleReacao.headerRow}>
            <Text style={styleReacao.title}>Pesquisa de Reação</Text>
          </View>

          <View style={styleReacao.questionCard}>
            <Ionicons name="star-half-outline" size={60} color="#4A0000" style={{ marginBottom: 20 }} />
            
            <Text style={styleReacao.questionText}>
              Como você avalia a qualidade geral deste treinamento (Simulação + Prática)?
            </Text>

            <View style={styleReacao.ratingRow}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity 
                  key={num}
                  onPress={() => setReacao(num)}
                  style={[
                    styleReacao.ratingCircle, 
                    reacao === num && styleReacao.ratingCircleSelected
                  ]}
                >
                  <Text style={[
                    styleReacao.ratingText, 
                    reacao === num && styleReacao.ratingTextSelected
                  ]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styleReacao.labelRow}>
              <Text style={styleReacao.labelSmall}>1 - Ruim</Text>
              <Text style={styleReacao.labelSmall}>5 - Excelente</Text>
            </View>
          </View>
        </View>

        <View style={styleReacao.footer}>
          {loading ? (
            <ActivityIndicator color="#4A0000" size="large" />
          ) : (
            <TouchableOpacity style={styleReacao.navButton} onPress={handleFinalizarTudo}>
              <Text style={styleReacao.navButtonText}>Finalizar Treinamento</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}