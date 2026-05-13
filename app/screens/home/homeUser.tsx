import React from 'react';
import {  View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import styleHome from '@/app/styles/homeStyle';
import { useRouter } from 'expo-router'; 
import { StatusBar } from 'expo-status-bar';


function WelcomeContent() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

  return (
    <View style={[
      styleHome.container, 
      { paddingTop: insets.top, paddingBottom: insets.bottom }
    ]}>
      
      <View style={styleHome.logoContainer}>
        
          <Image
            source={require('../../../assets/images/logoof2.png')}
            style={{ width: '120%', height: '120%'}}
            resizeMode="contain"
            />
        
      </View>

      <View style={styleHome.buttonContainer}>
        <TouchableOpacity 
          style={styleHome.button} 
          activeOpacity={0.8}
          onPress={() => router.push('/screens/login/loginUser')}
        >
          <Text style={styleHome.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default function WelcomeScreen() {
  return (
    <SafeAreaProvider>
      <StatusBar style='dark'/>
      <WelcomeContent />
    </SafeAreaProvider>
  );
}

