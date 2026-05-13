import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styleForgot from '@/app/styles/forgotStyle';

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Digite seu e-mail para continuar'),
});

export default function ForgotPass() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (values: { email: string }) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, values.email);
      
      router.push({
        pathname: '/screens/reset/agreeemail',
        params: { email: values.email }
      });
      
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Não encontramos uma conta com este e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={{ flex: 1, backgroundColor: '#4A0000' }} 
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#4A0000' }} 
        style={styleForgot.container}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" />
        
        
        <View style={styleForgot.headerSection}>
          <Image 
            source={require('../../../assets/images/logoof2.png')} 
            style={{ width: 210, height: 210, marginTop: 35 }} 
            resizeMode="contain" 
          />
        </View>

       
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotSchema}
          onSubmit={handleResetPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styleForgot.bodySection}>
              <Text style={styleForgot.title}>Esqueceu a senha?</Text>
              <Text style={styleForgot.description}>
                Digite o e-mail cadastrado e enviaremos o link para você criar uma nova senha.
              </Text>

              <Text style={styleForgot.label}>E-mail de cadastro:</Text>
              <View style={styleForgot.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styleForgot.inputIcon} />
                <TextInput
                  style={styleForgot.inputField}
                  placeholder="Seu e-mail aqui"
                  placeholderTextColor="#999"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styleForgot.errorText}>{errors.email}</Text>
              )}

              <TouchableOpacity 
                style={styleForgot.button} 
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#4A0000" />
                ) : (
                  <Text style={styleForgot.buttonText}>Enviar Link</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styleForgot.backLink} 
                onPress={() => router.back()}
              >
                <Text style={styleForgot.backLinkText}>Voltar para o login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}