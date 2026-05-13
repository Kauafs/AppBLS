import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image, Switch, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import styleLogin from '@/app/styles/loginStyle';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function LoginUser() {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [initialEmail, setInitialEmail] = useState(''); 
  const [initialPassword, setInitialPassword] = useState(''); 
  const router = useRouter();

  
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('@saveu_email');
        const savedPass = await AsyncStorage.getItem('@saveu_pass');
        const savedCheck = await AsyncStorage.getItem('@saveu_remember');

        if (savedCheck === 'true') {
          if (savedEmail) setInitialEmail(savedEmail);
          if (savedPass) setInitialPassword(savedPass);
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };
    loadSavedCredentials();
  }, []);

  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

     
      if (rememberMe) {
        await AsyncStorage.setItem('@saveu_email', values.email);
        await AsyncStorage.setItem('@saveu_pass', values.password);
        await AsyncStorage.setItem('@saveu_remember', 'true');
      } else {
        await AsyncStorage.removeItem('@saveu_email');
        await AsyncStorage.removeItem('@saveu_pass');
        await AsyncStorage.setItem('@saveu_remember', 'false');
      }

      const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const notaPreTeste = userData.notas?.pre_teste;

        if (typeof notaPreTeste === 'number') {
          router.replace('/(auth)/(tabs)');
        } else {
          router.replace('/screens/evaluation/testUser');
        }
      } else {
        router.replace('/screens/evaluation/testUser');
      }
    } catch (error: any) {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        style={styleLogin.container} 
        bounces={false} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" />

        <View style={styleLogin.logoSection}>
          <Image 
            source={require('../../../assets/images/logoof2.png')} 
            style={styleLogin.logo} 
            resizeMode="contain" 
          />
        </View>

        <Formik
          enableReinitialize={true} 
          initialValues={{ email: initialEmail, password: initialPassword }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styleLogin.formSection}>
              <Text style={styleLogin.title}>Bem-Vindo</Text>
              <Text style={styleLogin.subtitle}>Acesse a plataforma SAVEU para continuar sua capacitação em BLS.</Text>

              <Text style={styleLogin.label}>E-mail:</Text>
              <View style={styleLogin.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styleLogin.inputIcon} />
                <TextInput
                  style={styleLogin.inputField}
                  placeholder="exemplo@dominio.com"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && <Text style={styleLogin.errorText}>{errors.email}</Text>}

              <Text style={styleLogin.label}>Senha:</Text>
              <View style={styleLogin.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styleLogin.inputIcon} />
                <TextInput
                  style={styleLogin.inputField}
                  placeholder="Sua senha"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
              </View>
              {errors.password && touched.password && <Text style={styleLogin.errorText}>{errors.password}</Text>}

              <View style={styleLogin.rowOptions}>
                <TouchableOpacity 
                  style={styleLogin.forgotPassContainer} 
                  onPress={() => router.push('/screens/reset/forgotpass')}
                >
                  <Ionicons name="help-circle-outline" size={18} color="#FFFFFF" />
                  <Text style={styleLogin.forgotPassText}>Esqueci a senha</Text>
                </TouchableOpacity>

                <View style={styleLogin.rememberMeContainer}>
                  <Text style={styleLogin.rememberMeText}>Lembrar de mim</Text>
                  <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    trackColor={{ false: "#767577", true: "#FFFFFF" }}
                    thumbColor={rememberMe ? "#4A0000" : "#f4f3f4"}
                    style={Platform.OS === 'android' ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
                  />
                </View>
              </View>

              <TouchableOpacity style={styleLogin.button} onPress={() => handleSubmit()} disabled={loading}>
                {loading ? <ActivityIndicator color="#4A0000" /> : <Text style={styleLogin.buttonText}>Entrar</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={styleLogin.registerLink} onPress={() => router.push('/screens/registers/registerUser')}>
                <Text style={styleLogin.registerText}>Ainda não tem conta? <Text style={styleLogin.boldText}>Cadastre-se</Text></Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}