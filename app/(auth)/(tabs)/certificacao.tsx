import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useRouter, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styleCert from '@/app/styles/certificacaoStyle';

export default function CertificacaoScreen() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    teoriaOk: false,
    posTesteOk: false,
    simulacaoOk: false,
    tempoRetencaoOk: false
  });
  
  const router = useRouter();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const verificarRequisitos = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;

          const qUser = query(collection(db, "usuarios"), where("uid", "==", user.uid), limit(1));
          const userSnap = await getDocs(qUser);
          
          if (!userSnap.empty) {
            const userDoc = userSnap.docs[0];
            const data = userDoc.data();
            const cpfUsuario = userDoc.id; 
            
           
            const progresso = data.progresso || {};
            const aulasConcluidasIds = Object.keys(progresso).filter(key => 
              progresso[key] === true && 
              key !== 'concluido' && 
              key !== 'data_liberacao_pos_teste'
            );
            
            const lessonsSnap = await getDocs(collection(db, "micromodulos"));
            const totalAulasExistentes = lessonsSnap.size;
            const teoriaConcluida = totalAulasExistentes > 0 && aulasConcluidasIds.length >= totalAulasExistentes;
            const fezPosTeste = data.notas?.pos_teste !== null && data.notas?.pos_teste !== undefined;
            const hoje = new Date();
            let tempoOk = false;
            const dataLibBruta = data.progresso?.data_liberacao_pos_teste;
            
            if (dataLibBruta) {
              
              const dataLib = dataLibBruta.toDate ? dataLibBruta.toDate() : new Date(dataLibBruta);
              tempoOk = hoje.getTime() >= dataLib.getTime();
            }

          
            const qAtivas = query(collection(db, "simulacoes"), where("ativo", "==", true));
            const snapAtivas = await getDocs(qAtivas);
            const totalSimulacoesAtivas = snapAtivas.size;

            const qResultados = query(
              collection(db, "resultados_simulacao"),
              where("id_participante", "==", cpfUsuario),
              where("aderencia_protocolo", "==", 1)
            );
            const snapResultados = await getDocs(qResultados);
            const totalConcluidasUsuario = snapResultados.size;

            const todasSimulacoesOk = totalSimulacoesAtivas > 0 && totalConcluidasUsuario >= totalSimulacoesAtivas;

            setStatus({
              teoriaOk: teoriaConcluida,
              posTesteOk: fezPosTeste,
              simulacaoOk: todasSimulacoesOk,
              tempoRetencaoOk: tempoOk
            });
          }
        } catch (e) {
          console.error("Erro na certificação:", e);
        } finally {
          setLoading(false);
        }
      };
      verificarRequisitos();
    }, [])
  );

  const certificadoLiberado = status.teoriaOk && status.posTesteOk && status.simulacaoOk && status.tempoRetencaoOk;

  if (loading) {
    return (
      <View style={[styleCert.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styleCert.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styleCert.safeAreaTop} />

      <View style={{ flex: 1 }}>
        <View style={styleCert.headerSection}>
          <TouchableOpacity style={styleCert.headerLeftButton} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={require('../../../assets/images/logoof.png')} style={styleCert.logo} resizeMode="contain" />
          <TouchableOpacity style={styleCert.headerRightButton} onPress={() => router.push('/(auth)/(tabs)/perfil')}>
            <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styleCert.bodySection}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styleCert.title}>Certificação</Text>

            <View style={styleCert.iconStatus}>
              <Ionicons 
                name={certificadoLiberado ? "trophy" : "ribbon-outline"} 
                size={100} 
                color={certificadoLiberado ? "#FFD700" : "#4A0000"} 
              />
            </View>

            <Text style={styleCert.progressoTexto}>Status da Capacitação</Text>

            <RequisitoItem label="Módulos Teóricos" check={status.teoriaOk} />
            
            <RequisitoItem 
                label="Período de Retenção" 
                check={status.tempoRetencaoOk} 
                info={!status.tempoRetencaoOk && status.teoriaOk ? "Aguardando prazo legal" : ""}
            />
            
            <RequisitoItem label="Avaliação Pós-Teste" check={status.posTesteOk} />
            
            <RequisitoItem label="Simulações Práticas (100%)" check={status.simulacaoOk} />

            <TouchableOpacity 
              style={[
                styleCert.btnAcao, 
                (!status.teoriaOk || !status.tempoRetencaoOk) && styleCert.btnDesativado
              ]}
              disabled={!status.teoriaOk || !status.tempoRetencaoOk}
              onPress={() => {
                if (certificadoLiberado) {
                  router.push('/(auth)/(tabs)/getCert');
                } else {
                  router.push('/(auth)/(tabs)/endQuiz');
                }
              }}
            >
              <Text style={styleCert.btnText}>
                {certificadoLiberado 
                  ? "Baixar Certificado" 
                  : !status.teoriaOk 
                    ? "Conclua a Teoria Primeiro" 
                    : !status.tempoRetencaoOk 
                      ? "Aguardando Retenção" 
                      : status.posTesteOk ? "Refazer Pós-Teste" : "Iniciar Pós-Teste"}
              </Text>
            </TouchableOpacity>

            {!status.simulacaoOk && status.teoriaOk && (
              <Text style={styleCert.avisoTexto}>
                * Você precisa concluir todas as simulações práticas com 100% no menu de Simulações.
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

function RequisitoItem({ label, check, info }: { label: string, check: boolean, info?: string }) {
  return (
    <View style={styleCert.requisitoCard}>
      <View style={{ flex: 1 }}>
        <Text style={[styleCert.requisitoText, !check && { color: '#999' }]}>{label}</Text>
        {info && !check ? <Text style={{ fontSize: 11, color: '#4A0000', marginTop: 2 }}>{info}</Text> : null}
      </View>
      <Ionicons 
        name={check ? "checkmark-circle" : "ellipse-outline"} 
        size={24} 
        color={check ? "#2D5A27" : "#CCC"} 
      />
    </View>
  );
}