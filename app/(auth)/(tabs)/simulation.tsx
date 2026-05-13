import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs, orderBy, query, where, limit } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig'; 
import { useRouter, useFocusEffect, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import styleSimulacao from '@/app/styles/simulationStyle';

export default function SimulacaoClinica() {
  const [cenarios, setCenarios] = useState<any[]>([]);
  const [resultadosConcluidos, setResultadosConcluidos] = useState<string[]>([]);
  const [bloqueado, setBloqueado] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const navigation = useNavigation();
  const user = auth.currentUser;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!user) return;
        setLoading(true);
        
        try {
        
          const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid), limit(1));
          const userSnap = await getDocs(qUser);
          
          if (!userSnap.empty) {
            const userDoc = userSnap.docs[0];
            const cpfUsuario = userDoc.id; 
            const userData = userDoc.data();
            
            const aprovadoNoTeste = userData.status_pos_teste === "aprovado";
            setBloqueado(!aprovadoNoTeste);

            if (aprovadoNoTeste) {
        
              const qCenarios = query(
                collection(db, "simulacoes"), 
                where("ativo", "==", true), 
                orderBy("ordem", "asc")
              );
              const snapCenarios = await getDocs(qCenarios);
              const listaCenarios = snapCenarios.docs.map(doc => ({ id: doc.id, ...doc.data() }));

             
              const qResultados = query(
                collection(db, "resultados_simulacao"),
                where("id_participante", "==", cpfUsuario),
                where("aderencia_protocolo", "==", 1)
              );
              const snapResultados = await getDocs(qResultados);
              const concluidos = snapResultados.docs.map(doc => doc.data().id_simulacao);

              setCenarios(listaCenarios);
              setResultadosConcluidos(concluidos);
            }
          }
        } catch (error) { 
          console.error("Erro ao carregar simulações:", error); 
        } finally { 
          setLoading(false); 
        }
      };

      fetchData();
    }, [user])
  );

  const renderCenario = ({ item }: { item: any }) => {
    const jaConcluiu = resultadosConcluidos.includes(item.id);
    return (
      <View style={[styleSimulacao.card, jaConcluiu && { opacity: 0.7 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styleSimulacao.cardTitle}>Simulação Clínica</Text>
            {jaConcluiu && <Ionicons name="checkmark-circle" size={22} color="#2E7D32" />}
        </View>
        
        <Text style={styleSimulacao.cardSubtitle}>Cenário: {item.titulo}</Text>
        
        <TouchableOpacity 
          style={[styleSimulacao.btnIniciar, jaConcluiu && { backgroundColor: '#A5A5A5' }]}
          onPress={() => {
            if (jaConcluiu) {
                Alert.alert("Simulação Concluída", "Você já atingiu a aderência máxima neste protocolo.");
                return;
            }
            router.push({ pathname: "/execSimulacao", params: { id: item.id, titulo: item.titulo } });
          }}
        >
          <Text style={styleSimulacao.btnText}>
            {jaConcluiu ? "Concluído (100%)" : "Iniciar Prática"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styleSimulacao.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      
      <View style={styleSimulacao.headerSection}>
        <TouchableOpacity 
          style={styleSimulacao.headerLeftButton} 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu-outline" size={40} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Image 
          source={require('../../../assets/images/logoof.png')} 
          style={styleSimulacao.logo} 
          resizeMode="contain" 
        />
        
        <TouchableOpacity 
          style={styleSimulacao.headerRightButton} 
          onPress={() => router.push('/(auth)/(tabs)/perfil')}
        >
          <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styleSimulacao.bodySection}>
        <View style={styleSimulacao.headerRow}>
          <Text style={styleSimulacao.title}>Simulação Prática</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4A0000" style={{ marginTop: 50 }} />
        ) : bloqueado ? (
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
            <Ionicons name="lock-closed" size={80} color="#4A0000" style={{ opacity: 0.2 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4A0000', marginTop: 20 }}>
              Acesso Restrito
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 10, color: '#666', lineHeight: 22 }}>
              Você precisa ser aprovado no Pós-Teste teórico para liberar as práticas.
            </Text>
            <TouchableOpacity 
              style={{ marginTop: 25, padding: 12, backgroundColor: '#4A0000', borderRadius: 8 }}
              onPress={() => router.push('/(auth)/(tabs)/certificacao')}
            >
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Ir para Avaliação</Text>
            </TouchableOpacity>
          </View>
        ) : (
         
          <FlatList 
            data={cenarios} 
            keyExtractor={item => item.id} 
            renderItem={renderCenario} 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 40 }} 
          />
        )}
      </View>
    </View>
  );
}