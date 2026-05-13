import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'; 
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router'; 
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styleList from '@/app/styles/listStyle';

export default function LessonsList() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter(); 
  const [lessons, setLessons] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const user = auth.currentUser;
          if (!user || !user.email) return;

          const qLessons = query(
            collection(db, "micromodulos"), 
            where("moduloId", "==", id), 
            orderBy("ordem", "asc")
          );
          const lessonSnap = await getDocs(qLessons);
          setLessons(lessonSnap.docs.map(d => ({ id: d.id, ...d.data() })));

          const qUser = query(collection(db, "usuarios"), where("email", "==", user.email));
          const userSnap = await getDocs(qUser);
          if (!userSnap.empty) {
            setUserProgress(userSnap.docs[0].data().progresso || {});
          }
        } catch (error) { 
          console.error("Erro ao buscar aulas:", error); 
        } finally { 
          setLoading(false); 
        }
      };
      fetchData();
    }, [id])
  );

  const renderLessonItem = ({ item, index }: { item: any, index: number }) => {
    const isFirstLesson = index === 0;
    const previousLessonId = index > 0 ? lessons[index - 1].id : null;
    const rawValue = userProgress[item.id];
    const previousRawValue = previousLessonId ? userProgress[previousLessonId] : null;

    const isLocked = !isFirstLesson && previousRawValue !== true;
    const isCompleted = rawValue === true;
    let progressPercent = isCompleted ? 100 : (rawValue === 1 ? 33 : (rawValue === 2 ? 66 : 0));

    return (
      <View style={[styleList.card, isLocked && styleList.cardLocked]}>
        <View style={styleList.cardHeader}>
          <Text style={styleList.cardTitle}>Aula {item.ordem} {isCompleted && "✅"}</Text>
          {isLocked && <Ionicons name="lock-closed" size={20} color="#4A0000" />}
        </View>
        <Text style={styleList.lessonName}>{item.titulo}</Text>

        {!isLocked ? (
          <>
            <Text style={styleList.progressionText}>Progresso: {progressPercent}%</Text>
            <View style={styleList.progressBarBg}>
              <View style={[styleList.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <TouchableOpacity 
              style={styleList.actionButton} 
              onPress={() => router.push({ 
                pathname: "/(auth)/(tabs)/player", 
                params: { 
                  id: item.id, 
                  titulo: item.titulo, 
                  descricao: item.descricao, 
                  url_video: item.url_video, 
                  url_imagem: item.url_imagem 
                } 
              } as any)}
            >
              <Text style={styleList.buttonText}>
                {isCompleted ? "REVER AULA" : progressPercent > 0 ? "CONTINUAR" : "INICIAR"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styleList.lockedContainer}>
            <Ionicons name="lock-closed-outline" size={32} color="#4A0000" />
            <Text style={styleList.lockedText}>Conclua a aula anterior para liberar</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) return (
    <View style={styleList.loader}>
      <ActivityIndicator size="large" color="#4A0000" />
    </View>
  );

  return (
    <View style={styleList.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
        
        <View style={styleList.headerSection}>
          <TouchableOpacity 
            style={styleList.headerLeftButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>

          <Image 
            source={require('../../../assets/images/logoof.png')} 
            style={styleList.logo} 
            resizeMode="contain" 
          />
        </View>

        <View style={styleList.bodySection}>
          <View style={styleList.headerRow}>
            <Text style={styleList.title}>Aulas</Text>
          </View>
          
          <FlatList 
            data={lessons} 
            keyExtractor={(item) => item.id} 
            renderItem={renderLessonItem} 
            contentContainerStyle={{ paddingBottom: 120 }} 
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', color: '#999', marginTop: 20}}>
                Nenhuma aula encontrada para este módulo.
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}