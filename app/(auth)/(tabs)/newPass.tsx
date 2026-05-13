import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../../firebaseConfig';
import { updatePassword } from 'firebase/auth';
import styleNovaSenha from '@/app/styles/passNew';

export default function NovaSenhaScreen() {
  const router = useRouter();
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const regras = {
    min: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /[0-9]/.test(senha),
    especial: /[@#%&$]/.test(senha),
  };

  const handleSalvar = async () => {
    const tudoCerto = Object.values(regras).every(v => v === true);
    if (!tudoCerto) {
      Alert.alert("Erro", "A senha não atende aos requisitos.");
      return;
    }
    if (senha !== confirmar) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, senha);
        Alert.alert("Sucesso", "Senha atualizada!");
        router.back();
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao atualizar. Tente relogar.");
    }
  };

  const Rule = ({ met, label }: { met: boolean, label: string }) => (
    <View style={styleNovaSenha.ruleRow}>
      <Ionicons 
        name={met ? "checkmark-circle" : "checkmark-circle-outline"} 
        size={20} 
        color={met ? "#4A0000" : "#CCC"} 
      />
      <Text style={[styleNovaSenha.ruleText, { color: met ? "#4A0000" : "#999" }]}>
        {label}
      </Text>
    </View>
  );

  return (
    <View style={styleNovaSenha.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1 }}>
        <View style={styleNovaSenha.headerSection}>
          <TouchableOpacity style={styleNovaSenha.headerLeftButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>

          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={styleNovaSenha.logo} 
            resizeMode="contain" 
          />

          <View style={styleNovaSenha.headerRightButton} />
        </View>

        <ScrollView style={styleNovaSenha.bodySection} showsVerticalScrollIndicator={false}>
          <Text style={styleNovaSenha.title}>Criar Nova senha</Text>
          <Text style={styleNovaSenha.description}>
            Crie uma senha forte para manter sua conta protegida. Depois é só confirmar e voltar ao aplicativo.
          </Text>

          <TextInput 
            style={styleNovaSenha.input} 
            placeholder="Nova Senha" 
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#999"
          />

          <TextInput 
            style={styleNovaSenha.input} 
            placeholder="Confirmar Senha" 
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
            placeholderTextColor="#999"
          />

          <View style={styleNovaSenha.rulesContainer}>
            <Rule met={regras.min} label="Mínimo de 8 caracteres" />
            <Rule met={regras.maiuscula} label="Uma letra maiúscula" />
            <Rule met={regras.minuscula} label="Uma letra minúscula" />
            <Rule met={regras.numero} label="Um número" />
            <Rule met={regras.especial} label="Um caracter especial (@, #, %, &, $)" />
          </View>

          <View style={styleNovaSenha.buttonRow}>
            <TouchableOpacity style={styleNovaSenha.btnCancel} onPress={() => router.back()}>
              <Text style={styleNovaSenha.btnTextCancel}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styleNovaSenha.btnSave} onPress={handleSalvar}>
              <Text style={styleNovaSenha.btnTextSave}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}