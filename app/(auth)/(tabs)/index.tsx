import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig'; 
import { useRouter, useFocusEffect, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native'; 
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styleModule from '@/app/styles/modulesStyle';

export default function ModulesList() {
  const [modules, setModules] = useState<any[]>([]);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any>({});
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const user = auth.currentUser;
          if (!user || !user.email) return;

          const qModulos = query(collection(db, "modulos"), orderBy("ordem", "asc"));
          const snapModulos = await getDocs(qModulos);
          const listaModulos = snapModulos.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          const snapLessons = await getDocs(collection(db, "micromodulos"));
          const listaLessons = snapLessons.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          const qUser = query(collection(db, "usuarios"), where("email", "==", user.email));
          const userSnap = await getDocs(qUser);
          
          if (!userSnap.empty) {
            setUserProgress(userSnap.docs[0].data().progresso || {});
          }

          setModules(listaModulos);
          setAllLessons(listaLessons);
        } catch (error) {
          console.error("Erro ao buscar módulos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [])
  );

  const checkModuleCompletion = (moduloId: string) => {
    const aulasDoModulo = allLessons.filter(lesson => lesson.moduloId === moduloId);
    if (aulasDoModulo.length === 0) return false;
    return aulasDoModulo.every(lesson => userProgress[lesson.id] === true);
  };

  const renderModuleItem = ({ item, index }: { item: any, index: number }) => {
    const isFirstModule = index === 0;
    const previousModule = !isFirstModule ? modules[index - 1] : null;
    const isLocked = !isFirstModule && !checkModuleCompletion(previousModule.id);

    return (
      <View style={[styleModule.card, isLocked && styleModule.cardLocked]}>
        <View style={styleModule.cardHeader}>
          <Text style={styleModule.cardTitle}>Módulo {item.ordem}</Text>
          {isLocked && <Ionicons name="lock-closed" size={20} color="#999" />}
        </View>

        <Text style={styleModule.moduleName}>{item.nome}</Text>

        {!isLocked ? (
          <TouchableOpacity 
            style={styleModule.actionButton}
            onPress={() => router.push(`/(auth)/(tabs)/${item.id}`)}
          >
            <Text style={styleModule.buttonText}>Acessar Módulo</Text>
          </TouchableOpacity>
        ) : (
          <View style={styleModule.lockedContainer}>
             <Ionicons name="lock-closed-outline" size={28} color="#999" />
             <Text style={styleModule.lockedText}>Conclua o módulo anterior para liberar</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styleModule.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styleModule.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
       
        <View style={styleModule.headerSection}>
          
          <TouchableOpacity 
            style={styleModule.headerLeftButton} 
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>

          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={styleModule.logo} 
            resizeMode="contain" 
          />

          <TouchableOpacity 
            style={styleModule.headerRightButton}
            onPress={() => router.push('/(auth)/(tabs)/perfil')}
          >
            <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styleModule.bodySection}>
          <View style={styleModule.headerRow}>
            <Text style={styleModule.title}>Sua Trilha</Text>
          </View>

          <FlatList
            data={modules}
            keyExtractor={(item) => item.id}
            renderItem={renderModuleItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }} 
          />
        </View>
      </View>
    </View>
  );
}