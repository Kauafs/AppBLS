import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useFocusEffect } from 'expo-router';
import { auth, db } from '../../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import stylePerfil from '@/app/styles/perfilStyle';

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);
  const [progressoPorcentagem, setProgressoPorcentagem] = useState(0);
  const [dataLiberacao, setDataLiberacao] = useState<string | null>(null);
  const [tempoEstudoFormatado, setTempoEstudoFormatado] = useState('0m'); 
  
  const router = useRouter();

  const [userData, setUserData] = useState({
    nome_completo: '',
    curso: '',
    semestre: '',
    cpf: '',
    genero: '',
    email: '',
  });

  const formatarTempoEstudo = (segundosTotais: number) => {
    if (!segundosTotais || segundosTotais <= 0) return '0m';
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    if (horas > 0) return minutos > 0 ? `${horas}h ${minutos}m` : `${horas}h`;
    return `${minutos}m`;
  };

  const calcularDiasRestantes = (dataISO: string) => {
    const hoje = new Date();
    const dataLib = new Date(dataISO);
    const diffInMs = dataLib.getTime() - hoje.getTime();
    const dias = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  };

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const q = query(collection(db, "usuarios"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();
          setDocId(userDoc.id);
          setDataLiberacao(data.progresso?.data_liberacao_pos_teste || null);
          setTempoEstudoFormatado(formatarTempoEstudo(Number(data.tempo_estudo_segundos || 0)));

          setUserData({
            nome_completo: data.nome_completo || '',
            curso: data.curso || '',
            semestre: data.semestre !== undefined ? String(data.semestre) : '',
            cpf: data.cpf || '',
            genero: data.genero || '',
            email: data.email || user.email,
          });

          const progressoUsuario = data.progresso || {};
          
          const concluidas = Object.entries(progressoUsuario)
            .filter(([key, value]) => 
              value === true && 
              key !== 'concluido' && 
              key !== 'data_liberacao_pos_teste' &&
              key !== 'pesquisa_reacao'
            ).length;
          
          const lessonsSnap = await getDocs(collection(db, "micromodulos"));
          if (lessonsSnap.size > 0) {
            setProgressoPorcentagem(Math.round((concluidas / lessonsSnap.size) * 100));
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchUserData(); }, []));

  const handleLogout = async () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: async () => {
          await signOut(auth);
          router.replace('/screens/login/loginUser'); 
      }}
    ]);
  };

  const handleSave = async () => {
    if (!docId) return;
    try {
      setLoading(true);
      const userRef = doc(db, "usuarios", docId);
      await updateDoc(userRef, {
        nome_completo: userData.nome_completo,
        curso: userData.curso,
        semestre: userData.semestre,
        genero: userData.genero
      });
      setEditMode(false);
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !editMode) {
    return (
      <View style={stylePerfil.loaderContainer}>
        <ActivityIndicator size="large" color="#4A0000" />
      </View>
    );
  }

  return (
    <View style={stylePerfil.container}>
      <StatusBar style="light" />
      <SafeAreaView style={stylePerfil.safeAreaTop} />
      
      <View style={{ flex: 1 }}>
        <View style={stylePerfil.headerSection}>
          <TouchableOpacity style={stylePerfil.headerLeftButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={40} color="#FFF" />
          </TouchableOpacity>

          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={stylePerfil.logoHeader} 
            resizeMode="contain" 
          />
          
          <TouchableOpacity style={stylePerfil.headerRightButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={40} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={stylePerfil.bodySection}>
          <Text style={stylePerfil.mainTitle}>Meu Perfil</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
            
            <View style={stylePerfil.idCard}>
              <View style={stylePerfil.avatarPlaceholder}>
                <Ionicons name="person" size={35} color="#FFF" />
              </View>
              <View style={stylePerfil.idInfo}>
                <Text style={stylePerfil.userName}>{userData.nome_completo || 'Usuário'}</Text>
                <Text style={stylePerfil.userId}>CPF: {userData.cpf}</Text>
                {!editMode && <Text style={stylePerfil.userSubInfo}>{userData.curso} - {userData.semestre}º Semestre</Text>}
              </View>
            </View>

            {!editMode && (
              <View>
                {dataLiberacao && (
                  <View style={stylePerfil.infoCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ 
                        backgroundColor: '#FDF2F2', 
                        padding: 10, 
                        borderRadius: 12,
                        width: 52,
                        height: 52,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Ionicons name="timer-outline" size={30} color="#4A0000" />
                      </View>
                      
                      <View style={{ marginLeft: 15, flex: 1 }}>
                        <Text style={[stylePerfil.cardTitle, { textAlign: 'left', marginBottom: 2 }]}>
                          Pós-Teste de Retenção
                        </Text>
                        
                        {(() => {
                          const dias = calcularDiasRestantes(dataLiberacao);
                          return dias > 0 ? (
                            <Text style={[stylePerfil.infoLabel, { textAlign: 'left' }]}>
                              Faltam <Text style={{ color: '#4A0000', fontWeight: 'bold' }}>{dias} dias</Text> para liberar.
                            </Text>
                          ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                              <Ionicons name="checkmark-circle" size={16} color="#2D5A27" />
                              <Text style={{ color: '#2D5A27', fontWeight: 'bold', fontSize: 14, marginLeft: 4 }}>
                                Avaliação liberada!
                              </Text>
                            </View>
                          );
                        })()}
                      </View>
                    </View>
                  </View>
                )}

                <View style={stylePerfil.infoCard}>
                  <Text style={stylePerfil.cardTitle}>Progresso do Curso</Text>
                  <View style={stylePerfil.divider} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={stylePerfil.infoLabel}>Módulos Concluídos</Text>
                    <Text style={stylePerfil.infoValue}>{progressoPorcentagem}%</Text>
                  </View>
                  <View style={{ height: 10, backgroundColor: '#EEE', borderRadius: 5, overflow: 'hidden' }}>
                    <View style={{ height: '100%', backgroundColor: '#4A0000', width: `${progressoPorcentagem}%` }} />
                  </View>
                </View>

                <View style={stylePerfil.infoCard}>
                  <Text style={stylePerfil.cardTitle}>Tempo de Estudo</Text>
                  <View style={stylePerfil.divider} />
                  <Text style={stylePerfil.timeValue}>{tempoEstudoFormatado}</Text>
                </View>

                <TouchableOpacity 
                  style={[stylePerfil.editButton, { backgroundColor: '#4A0000', marginTop: 10 }]} 
                  onPress={() => router.push('/(auth)/(tabs)/newPass')}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[stylePerfil.editButtonText, { color: '#FFF' }]}>Alterar Senha</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={stylePerfil.editButton} onPress={() => setEditMode(true)}>
                  <Text style={stylePerfil.editButtonText}>Editar Perfil</Text>
                </TouchableOpacity>
              </View>
            )}

            {editMode && (
              <View style={stylePerfil.infoCard}>
                <Text style={stylePerfil.inputLabel}>Nome Completo</Text>
                <TextInput style={stylePerfil.input} value={userData.nome_completo} onChangeText={(t) => setUserData({...userData, nome_completo: t})} />
                <Text style={stylePerfil.inputLabel}>Curso</Text>
                <TextInput style={stylePerfil.input} value={userData.curso} onChangeText={(t) => setUserData({...userData, curso: t})} />
                <Text style={stylePerfil.inputLabel}>Semestre</Text>
                <TextInput style={stylePerfil.input} value={userData.semestre} keyboardType="numeric" onChangeText={(t) => setUserData({...userData, semestre: t})} />
                <Text style={stylePerfil.inputLabel}>Gênero</Text>
                <TextInput style={stylePerfil.input} value={userData.genero} onChangeText={(t) => setUserData({...userData, genero: t})} />
                
                <TouchableOpacity style={stylePerfil.saveButton} onPress={handleSave}>
                  <Text style={stylePerfil.saveButtonText}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylePerfil.cancelButton} onPress={() => setEditMode(false)}>
                  <Text style={stylePerfil.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}