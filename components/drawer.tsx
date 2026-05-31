import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { auth } from '../firebaseConfig'; 
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/screens/login/loginUser');
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.headerContainer}>
        <SafeAreaView edges={['top']} style={styles.headerContent}>
          <Image 
            source={require('../assets/images/logoof.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </SafeAreaView>
      </View>

     
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/screens/result/preResults')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="stats-chart" size={24} color="#4A0000" />
          </View>
          <Text style={styles.menuLabel}>Resultado Pré-Teste</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/screens/result/posResult')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="stats-chart" size={24} color="#4A0000" />
          </View>
          <Text style={styles.menuLabel}>Resultado Pós-Teste</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/(auth)/(tabs)/getCert')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="ribbon" size={24} color="#4A0000" />
          </View>
          <Text style={styles.menuLabel}>Visualizar Certificado</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/screens/performance/evolution')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="analytics" size={24} color="#4A0000" />
          </View>
          <Text style={styles.menuLabel}>Evolução</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/screens/sobre/info')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="information-circle" size={24} color="#4A0000" />
          </View>
          <Text style={styles.menuLabel}>Sobre nós</Text>
        </TouchableOpacity>
        

      </DrawerContentScrollView>

     
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#4A0000" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4A0000',
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 80,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 20,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#4A0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});