import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert 
} from 'react-native';
import { doc, getDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig'; 
import { useRouter, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import certstyles from '@/app/styles/cert';

export default function MyCertificatesMobile() {
  const [certificado, setCertificado] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const fetchCertificado = async () => {
        try {
          let userCpf = "";
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          
          if (userDoc.exists()) {
            userCpf = userDoc.data().cpf;
          } else {
            const q = query(collection(db, "usuarios"), where("email", "==", user.email));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
              userCpf = querySnap.docs[0].data().cpf;
            }
          }

          if (userCpf) {
            const unsub = onSnapshot(doc(db, "certificados", userCpf), (certDoc) => {
              if (certDoc.exists()) {
                setCertificado(certDoc.data());
              } else {
                setCertificado(null);
              }
              setLoading(false);
            });
            return unsub;
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error("Erro ao buscar certificado:", error);
          setLoading(false);
        }
      };

      const unsubPromise = fetchCertificado();
      return () => {
        unsubPromise.then(unsub => unsub && unsub());
      };
    }, [])
  );

  const handleDownload = async () => {
    if (certificado && certificado.url_pdf) {
      try {
        await Linking.openURL(certificado.url_pdf);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível abrir o arquivo PDF.");
      }
    } else {
      Alert.alert("Aviso", "O arquivo digital ainda não foi processado.");
    }
  };

  if (loading) {
    return (
      <View style={[certstyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={certstyles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        
        
        <View style={certstyles.headerSection}>
          <TouchableOpacity 
            style={certstyles.headerLeftButton} 
            onPress={() => router.back()} 
          >
            <Ionicons name="close-outline" size={45} color="#FFFFFF" />
          </TouchableOpacity>

          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={certstyles.logo} 
            resizeMode="contain" 
          />

          <TouchableOpacity 
            style={certstyles.headerRightButton}
            onPress={() => router.push('/(auth)/(tabs)/perfil')}
          >
            <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        
        <View style={certstyles.bodySection}>
          <View style={certstyles.headerRow}>
            <Text style={certstyles.title}>Meus Certificados</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
            {!certificado ? (
              <View style={[certstyles.card, certstyles.cardLocked]}>
                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                  <Ionicons name="ribbon-outline" size={60} color="#ccc" />
                  <Text style={certstyles.moduleName}>Nenhum certificado disponível</Text>
                </View>
                <View style={certstyles.lockedContainer}>
                  <Ionicons name="lock-closed-outline" size={24} color="#666" />
                  <Text style={certstyles.lockedText}>
                    Seu certificado será liberado após a aprovação presencial.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={certstyles.card}>
                <View style={certstyles.cardHeader}>
                  <Text style={certstyles.cardTitle}>SAVEU Oficial</Text>
                  <Ionicons name="checkmark-circle" size={24} color="#4A0000" />
                </View>

                <Text style={certstyles.moduleName}>{certificado.curso || "Capacitação SAVEU"}</Text>

                <View style={{ marginBottom: 20 }}>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, color: '#999', fontWeight: 'bold' }}>ALUNO</Text>
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>{certificado.nome_aluno}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ fontSize: 10, color: '#999', fontWeight: 'bold' }}>DATA</Text>
                      <Text style={{ fontSize: 13, color: '#4A0000', fontWeight: 'bold' }}>
                        {certificado.data_emissao?.seconds 
                          ? new Date(certificado.data_emissao.seconds * 1000).toLocaleDateString('pt-BR') 
                          : "---"}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 10, color: '#999', fontWeight: 'bold' }}>CÓDIGO</Text>
                      <Text style={{ fontSize: 13, color: '#4A0000', fontWeight: 'bold' }}>{certificado.codigo_autenticidade}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity 
                  style={[certstyles.actionButton, !certificado.url_pdf && { opacity: 0.5 }]}
                  onPress={handleDownload}
                  disabled={!certificado.url_pdf}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons 
                      name={certificado.url_pdf ? "cloud-download-outline" : "time-outline"} 
                      size={20} 
                      color="#FFF" 
                      style={{ marginRight: 8 }} 
                    />
                    <Text style={certstyles.buttonText}>
                      {certificado.url_pdf ? "Visualizar Certificado" : "Sincronizando..."}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

