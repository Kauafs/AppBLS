import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Image, Keyboard } from 'react-native';
import { db, auth } from '../../../firebaseConfig'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import styleForum from '@/app/styles/forumStyle';

export default function Forum() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "forum"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      await addDoc(collection(db, "forum"), {
        question: newMessage.trim(), 
        author: user.displayName || user.email || "Estudante", 
        authorId: user.uid,
        status: "Pendente",
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
      Keyboard.dismiss(); 
    } catch (error) { console.error(error); }
  };

  return (
    <View style={styleForum.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#4A0000' }} />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
       
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 3}
      >
        <View style={{ flex: 1, backgroundColor: '#4A0000' }}>
          
          {/* HEADER */}
          <View style={styleForum.headerSection}>
            <TouchableOpacity style={styleForum.headerLeftButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={40} color="#FFFFFF" />
            </TouchableOpacity>

            <Image 
              source={require('../../../assets/images/logoof.png')} 
              style={styleForum.logo} 
              resizeMode="contain" 
            />

            <TouchableOpacity 
              style={styleForum.headerRightButton}
              onPress={() => router.push('/(auth)/(tabs)/perfil')}
            >
              <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          
          <View style={styleForum.bodySection}>
            <View style={styleForum.headerRow}>
              <Text style={styleForum.title}>Fórum de Dúvidas</Text>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#4A0000" style={{ flex: 1 }} />
            ) : (
              <FlatList
                data={messages}
                keyExtractor={item => item.id}
                inverted
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styleForum.messageCard}>
                    <Text style={styleForum.user}>{item.author}</Text>
                    <Text style={styleForum.text}>{item.question}</Text>
                    {item.resposta && (
                      <View style={styleForum.replyBox}>
                        <Text style={styleForum.replyHeader}>✔ RESPOSTA DO TUTOR:</Text>
                        <Text style={styleForum.replyText}>{item.resposta}</Text>
                      </View>
                    )}
                  </View>
                )}
              />
            )}
          </View>

          
          <View style={styleForum.inputContainer}>
            <TextInput
              style={styleForum.input}
              placeholder="Digite sua dúvida..."
              value={newMessage}
              onChangeText={setNewMessage}
              importantForAutofill="no"
            />
            <TouchableOpacity 
              style={[styleForum.sendBtn, { opacity: newMessage.trim() ? 1 : 0.5 }]} 
              onPress={sendMessage}
              disabled={!newMessage.trim()}
            >
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}