import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesInfo from '@/app/styles/infoStyle';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={stylesInfo.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        
        {}
        <View style={stylesInfo.headerSection}>
          <TouchableOpacity 
            style={stylesInfo.headerLeftButton} 
            onPress={() => router.replace('/(auth)/(tabs)')}
          >
            <Ionicons name="close-outline" size={45} color="#FFFFFF" />
          </TouchableOpacity>
          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={stylesInfo.logo} 
            resizeMode="contain" 
          />
        </View>

        {}
        <ScrollView 
          style={stylesInfo.bodySection} 
          contentContainerStyle={stylesInfo.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          
          {}
          <View style={stylesInfo.sectionContainer}>
            <Text style={stylesInfo.sectionTitle}>Desenvolvido por:</Text>
            <View style={stylesInfo.logosContainer}>
              <Image 
                source={require('../../../assets/images/gif2.gif')} 
                style={stylesInfo.partnerLogo} 
                resizeMode="contain" 
              />
              <Image 
                source={require('../../../assets/images/med1.png')} 
                style={stylesInfo.partnerLogo} 
                resizeMode="contain" 
              />
            </View>
          </View>

          {}
          <View style={stylesInfo.sectionContainer}>
            <Text style={stylesInfo.sectionTitle}>Professores e Pesquisadores envolvidos :</Text>
            <View style={stylesInfo.listContainer}>
              <View style={stylesInfo.listItem}>
                <Ionicons name="person-outline" size={18} color="#4A0000" style={stylesInfo.listIcon} />
                <Text style={stylesInfo.listItemText}>Isabele Maranhão</Text>
              </View>
              <View style={stylesInfo.listItem}>
                <Ionicons name="person-outline" size={18} color="#4A0000" style={stylesInfo.listIcon} />
                <Text style={stylesInfo.listItemText}>Luiz Mansur</Text>
              </View>
            </View>
          </View>

          {}
          <View style={stylesInfo.sectionContainer}>
            <Text style={stylesInfo.sectionTitle}>Desenvolvedores responsáveis:</Text>
            <View style={stylesInfo.listContainer}>
              <View style={stylesInfo.listItem}>
                <Ionicons name="code-slash-outline" size={18} color="#4A0000" style={stylesInfo.listIcon} />
                <Text style={stylesInfo.listItemText}>Felipe Kauã</Text>
              </View>
              <View style={stylesInfo.listItem}>
                <Ionicons name="code-slash-outline" size={18} color="#4A0000" style={stylesInfo.listIcon} />
                <Text style={stylesInfo.listItemText}>Bruno</Text>
              </View>
              <View style={stylesInfo.listItem}>
                <Ionicons name="code-slash-outline" size={18} color="#4A0000" style={stylesInfo.listIcon} />
                <Text style={stylesInfo.listItemText}>Alvaro</Text>
              </View>
            </View>
          </View>

          {}
          <View style={stylesInfo.sectionContainer}>
            <Text style={stylesInfo.sectionTitle}>Designers:</Text>
            <View style={stylesInfo.listContainer}>
              <View style={stylesInfo.listItem}>
                <Ionicons name="color-wand-outline" size={18} color="#4A0000" style={stylesInfo.listIcon} />
                <Text style={stylesInfo.listItemText}>Dayane Pontes</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}