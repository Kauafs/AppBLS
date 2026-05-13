import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import styleConfirm from '@/app/styles/agreeStyle';

export default function ConfirmEmail() {
  
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const handleResendEmail = async () => {
    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Sucesso", "E-mail de redefinição reenviado!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao reenviar. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styleConfirm.container}>
      <StatusBar style="dark" />
      
      <View style={styleConfirm.headerSection}>
        <Image 
          source={require('../../../assets/images/logoof2.png')} 
          style={styleConfirm.logo} 
          resizeMode="contain" 
        />
      </View>

      <View style={styleConfirm.bodySection}>
        
        <TouchableOpacity style={styleConfirm.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styleConfirm.titleContainer}>
          <Text style={styleConfirm.title}>Confirmar e-mail</Text>
        </View>

        <View style={styleConfirm.iconContainer}>
          <Ionicons name="mail-open-outline" size={100} color="#FFFFFF" />
        </View>

        <Text style={styleConfirm.messageText}>Enviamos um link para:</Text>
        <Text style={styleConfirm.emailText}>{email || "usuario@exemplo.com"}</Text>

        <Text style={styleConfirm.subMessage}>
          Verifique sua caixa de entrada e clique no link para redefinir sua senha com segurança.
        </Text>

        <TouchableOpacity style={styleConfirm.button} onPress={handleResendEmail}>
          <Text style={styleConfirm.buttonText}>Reenviar E-mail</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}