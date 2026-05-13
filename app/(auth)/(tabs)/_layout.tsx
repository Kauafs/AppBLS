import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const horaEntradaRef = useRef(Date.now());

  useEffect(() => {
    const registrarAcesso = async () => {
      if (auth.currentUser) {
        try {
          const q = query(
            collection(db, "usuarios"), 
            where("uid", "==", auth.currentUser.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDocId = querySnapshot.docs[0].id; 
            const userRef = doc(db, "usuarios", userDocId);

            await updateDoc(userRef, {
              quantidade_acesso: increment(1)
            });
            console.log(`[SAVEU] Acesso registrado para o CPF: ${userDocId}`);
          }
        } catch (error) {
          console.error("[SAVEU] Erro ao registrar acesso:", error);
        }
      }
    };

    registrarAcesso();

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        const horaSaida = Date.now();
        const segundosPassados = Math.floor((horaSaida - horaEntradaRef.current) / 1000);

        if (segundosPassados >= 1 && auth.currentUser) {
          try {
            const q = query(
              collection(db, "usuarios"), 
              where("uid", "==", auth.currentUser.uid)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userDocId = querySnapshot.docs[0].id;
              const userRef = doc(db, "usuarios", userDocId);

              await updateDoc(userRef, {
                tempo_estudo_segundos: increment(segundosPassados)
              });
              console.log(`[SAVEU] Tempo salvo: ${segundosPassados}s`);
            }
          } catch (error) {
            console.error("[SAVEU] Erro ao salvar tempo:", error);
          }
        }
      } else if (nextAppState === 'active') {
        horaEntradaRef.current = Date.now();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.sosButton, { bottom: 80 + insets.bottom }]} 
        onPress={() => router.push('/screens/ia/support')}
      >
        <Ionicons name="medical" size={28} color="#FFF" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
          tabBarStyle: {
            backgroundColor: '#4A0000',
            borderTopWidth: 0,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            paddingTop: 10,
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 'bold',
            marginBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "school" : "school-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            tabBarLabel: 'Fórum',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="simulation"
          options={{
            tabBarLabel: 'Simulação',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "pulse" : "pulse-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="certificacao"
          options={{
            tabBarLabel: 'Certificação',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "ribbon" : "ribbon-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="[id]" options={{ href: null }} />
        <Tabs.Screen name="player" options={{ href: null }} />
        <Tabs.Screen name="execSimulacao" options={{ href: null }} />
        <Tabs.Screen name="endQuiz" options={{ href: null }} />
        <Tabs.Screen name="perfil" options={{ href: null }} />
        <Tabs.Screen name="getCert" options={{ href: null }} />
        <Tabs.Screen name="newPass" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#4A0000', 
    width: 65, 
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 2, 
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sosText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900', 
    marginTop: -2,
    letterSpacing: 1, 
  }
});