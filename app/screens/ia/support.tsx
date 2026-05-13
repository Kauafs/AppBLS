import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Image, Alert,Keyboard } from 'react-native';
import { db, auth } from '../../../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { model } from '../../../geminiConfig';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import styleSuport from '@/app/styles/suportStyle';

export default function SuporteEmergencia() {
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pessoa, setPessoa] = useState('Adulto');
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  
  const limparTextoIA = (texto: string) => {
    return texto.replace(/\*/g, ''); 
  };

  const enviarParaIA = async (tipoRapido?: string) => {
    const textoFinal = tipoRapido || mensagem;
    if (!textoFinal.trim()) return;

    Keyboard.dismiss();

    const user = auth.currentUser;
    const logEmergencia = {
      nomeParticipante: user?.displayName || user?.email || "Usuário",
      idEmergencia: Date.now(),
      tipoSocorro: tipoRapido || "Manual",
      tipoPessoa: pessoa,
      acionamento: new Date().toISOString(),
    };

    try {
      const novoHistorico = [...conversa, { role: 'user' as const, text: textoFinal }];
      setConversa(novoHistorico);
      setLoading(true);
      setMensagem('');

      
      await addDoc(collection(db, "logs_emergencia"), logEmergencia);
      
     
      const prompt = `
        Aja como um assistente de Primeiros Socorros (BLS).
        Vítima: ${pessoa}. 
        Emergência: ${textoFinal}. 
        Dê instruções rápidas, claras e curtas.
        IMPORTANTE: NÃO USE NEGRITO, NÃO USE ASTERISCOS E NÃO USE TABELAS. 
        Envie apenas texto puro e direto.
      `;

      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      
      
      const textoFinalIA = limparTextoIA(response.text());

      setConversa([...novoHistorico, { role: 'model' as const, text: textoFinalIA }]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha na conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styleSuport.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? -40 : 0} 
      >
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          
          <View style={styleSuport.headerSection}>
            <TouchableOpacity style={styleSuport.headerLeftButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Image 
              source={require('../../../assets/images/logoof.png')} 
              style={styleSuport.logo} 
              resizeMode="contain" 
            />
            
            <TouchableOpacity style={styleSuport.headerRightButton} onPress={() => router.push('/modules/perfil')}>
              <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styleSuport.bodySection}>
            <View style={styleSuport.headerRow}>
              <Text style={styleSuport.title}>SAVEU - Suporte IA</Text>
            </View>

            <View style={styleSuport.selectorContainer}>
              <Text style={styleSuport.label}>Vítima:</Text>
              <View style={styleSuport.row}>
                {['Adulto', 'Criança', 'Adolescente'].map((t) => (
                  <TouchableOpacity 
                    key={t} 
                    style={[styleSuport.miniChip, pessoa === t && styleSuport.miniChipActive]} 
                    onPress={() => setPessoa(t)}
                  >
                    <Text style={pessoa === t ? styleSuport.textActive : styleSuport.textInactive}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <ScrollView 
              ref={scrollViewRef}
              style={{ flex: 1 }}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {conversa.map((item, index) => (
                <View key={index} style={[styleSuport.messageCard, item.role === 'user' ? styleSuport.balaoUser : styleSuport.balaoAI]}>
                  <Text style={item.role === 'user' ? styleSuport.textUser : styleSuport.textAI}>{item.text}</Text>
                </View>
              ))}
              {loading && <ActivityIndicator color="#4A0000" style={{ marginTop: 10 }} />}
            </ScrollView>

            <View style={styleSuport.quickActions}>
              {['Desmaio', 'Engasgo', 'Parada'].map((s) => (
                <TouchableOpacity key={s} style={styleSuport.chip} onPress={() => enviarParaIA(s)}>
                  <Text style={styleSuport.chipText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[
            styleSuport.inputContainer, 
            { paddingBottom: Platform.OS === 'android' ? 40 : 35 } 
          ]}>
            <TextInput
              style={styleSuport.input}
              placeholder="Descreva a emergência..."
              value={mensagem}
              onChangeText={setMensagem}
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              style={[styleSuport.sendBtn, { opacity: mensagem.trim() ? 1 : 0.5 }]} 
              onPress={() => enviarParaIA()}
              disabled={!mensagem.trim()}
            >
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}