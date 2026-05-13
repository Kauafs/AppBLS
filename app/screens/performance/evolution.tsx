import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { db, auth } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import styleReacao from '@/app/styles/reactStyle';

export default function IndicadoresPerformance() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        
        const docSnap = await getDoc(doc(db, "indicadores_kirkpatrick", user.uid));
        if (docSnap.exists()) {
          setDados(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao carregar indicadores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndicadores();
  }, []);

  
  const COR_PRINCIPAL = "#4A0000";
  const COR_TEXTO_SUAVE = "#999";

  return (
    <View style={styleReacao.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styleReacao.safeAreaTop} />

      <View style={styleReacao.headerSection}>
        <TouchableOpacity style={styleReacao.headerLeftButton} onPress={() => router.back()}>
          <Ionicons name="close-outline" size={40} color="#FFFFFF" />
        </TouchableOpacity>
        <Image source={require('../../../assets/images/logoof.png')} style={styleReacao.logo} resizeMode="contain" />
      </View>

      <View style={styleReacao.bodySection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styleReacao.headerRow}>
            <Text style={styleReacao.title}>Desempenho Kirkpatrick</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={COR_PRINCIPAL} style={{ marginTop: 50 }} />
          ) : dados ? (
            <View style={{ gap: 20, paddingBottom: 30 }}>
              
              
              <View style={[styleReacao.questionCard, { borderColor: COR_PRINCIPAL, borderWidth: 2 }]}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: COR_TEXTO_SUAVE, textTransform: 'uppercase' }}>
                  Status de Impacto Social
                </Text>
                <Text style={{ fontSize: 48, fontWeight: '900', color: COR_PRINCIPAL }}>
                  {dados.impacto}
                </Text>
                <View style={{ height: 1, backgroundColor: '#EEE', width: '100%', marginVertical: 10 }} />
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Score de Retenção e Prática: <Text style={{ fontWeight: 'bold' }}>{dados.score_global}/10</Text>
                </Text>
              </View>

              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                
                <View style={[styleReacao.questionCard, { width: '48%', padding: 15 }]}>
                  <Ionicons name="star" size={30} color={COR_PRINCIPAL} />
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: COR_TEXTO_SUAVE, marginTop: 5, textTransform: 'uppercase' }}>
                    Nível 1: Reação
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: '900', color: COR_PRINCIPAL }}>{dados.nivel1_reacao}/5</Text>
                </View>

                
                <View style={[styleReacao.questionCard, { width: '48%', padding: 15 }]}>
                  <Ionicons name="analytics" size={30} color={COR_PRINCIPAL} />
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: COR_TEXTO_SUAVE, marginTop: 5, textTransform: 'uppercase' }}>
                    Nível 2: Evolução
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: '900', color: COR_PRINCIPAL }}>+{dados.nivel2_aprendizagem}</Text>
                </View>
              </View>

              
              <View style={[styleReacao.questionCard, { flexDirection: 'row', justifyContent: 'space-between', padding: 20 }]}>
                <View>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: COR_TEXTO_SUAVE, textTransform: 'uppercase' }}>
                    Nível 3: Comportamento
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '900', color: '#333' }}>Capacidade Prática</Text>
                </View>
                <Ionicons 
                  name={dados.nivel3_comportamento ? "shield-checkmark" : "alert-circle"} 
                  size={40} 
                  color={COR_PRINCIPAL} 
                />
              </View>

              
              <Text style={{ textAlign: 'center', fontSize: 12, color: COR_TEXTO_SUAVE, fontStyle: 'italic', paddingHorizontal: 20 }}>
                Os indicadores acima cruzam dados do seu Pré-Teste, Pós-Teste, Simulação Prática e Avaliação de Reação.
              </Text>

            </View>
          ) : (
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Ionicons name="search-outline" size={60} color="#CCC" />
              <Text style={{ color: COR_TEXTO_SUAVE, marginTop: 10 }}>Nenhum dado consolidado encontrado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}