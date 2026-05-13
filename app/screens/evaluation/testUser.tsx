import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styleTest from '@/app/styles/testStyle';

export default function EvaluationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStartTest = () => {
    router.push('/(auth)/initialQuiz'); 
  };

  return (
    <View style={styleTest.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
      
        <View style={styleTest.headerSection}>
          <TouchableOpacity style={styleTest.headerLeftButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={styleTest.logo} 
            resizeMode="contain" 
          />
          <View style={styleTest.headerRightButton} />
        </View>

       
        <View style={styleTest.bodySection}>
          <View style={styleTest.headerRow}>
            <Text style={styleTest.title}>Avaliação Cognitiva</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
           
            <View style={styleTest.cardLarge}>
              <View style={styleTest.cardIconContainer}>
                <Ionicons name="document-text-outline" size={40} color="#4A0000" />
              </View>
              <Text style={styleTest.cardTitleLarge}>Pré-Teste</Text>
              <Text style={styleTest.cardDescriptionLarge}>
                Responda às questões iniciais para avaliarmos seu conhecimento prévio sobre o protocolo BLS antes de iniciar o treinamento.
              </Text>
            </View>

            <View style={[styleTest.cardLarge, styleTest.cardLocked]}>
              <View style={styleTest.cardIconContainer}>
                <Ionicons name="lock-closed-outline" size={40} color="#999" />
              </View>
              <Text style={styleTest.cardTitleLarge}>Pós-Teste</Text>
              <Text style={styleTest.cardDescriptionLarge}>
                Segunda etapa da avaliação para medir a retenção de conhecimento após a conclusão de todos os módulos.
              </Text>
              <View style={styleTest.lockedBadge}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styleTest.lockedBadgeText}>Disponível após 90 dias</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={[
          styleTest.footer, 
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 25 }
        ]}>
          <TouchableOpacity 
            style={styleTest.startButton} 
            onPress={handleStartTest}
            activeOpacity={0.8}
          >
            <Text style={styleTest.startButtonText}>Iniciar Teste</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}