import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import emailjs from '@emailjs/react-native';
import { auth, db } from '../../../firebaseConfig';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import styleParabens from '@/app/styles/parabensStyle';

emailjs.init("CADASTRE A SUA ;)");

export default function TelaParabens() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);

  
  const SERVICE_ID = 'CADASTRE A SUA ;)';
  const TEMPLATE_ID = 'CADASTRE A SUA ;)';
  const PUBLIC_KEY = 'CADASTRE A SUA ;)';

  const enviarConviteEmailJS = async () => {
    setEnviando(true);
    
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        return;
      }

      
      const qUser = query(
        collection(db, "usuarios"), 
        where("uid", "==", user.uid), 
        limit(1)
      );
      const userSnap = await getDocs(qUser);
      
      let nomeUsuario = "Participante";
      if (!userSnap.empty) {
        nomeUsuario = userSnap.docs[0].data().nome_completo;
      }

     
      const mensagemConvite = `Parabéns! Você concluiu todas as etapas teóricas e simuladas no app SAVEU com 100% de aproveitamento. 
      \nEstamos felizes em convidá-lo para a Simulação Presencial de BLS (Suporte Básico de Vida), onde você colocará em prática suas habilidades em um ambiente realístico.
      \nEm breve, nossa equipe entrará em contato para agendar o melhor horário.`;

      
      const templateParams = {
        name: nomeUsuario,
        time: new Date().toLocaleString('pt-BR'),
        message: mensagemConvite,
        user_email: user.email,
      };

    
      await (emailjs.send as any)(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        { publicKey: PUBLIC_KEY }
      );

      Alert.alert(
        "Sucesso!", 
        "O convite foi enviado para o seu e-mail! Agora, por favor, responda nossa pesquisa de satisfação.",
        [{
          text: "Ir para pesquisa",
          onPress: () => router.replace("screens/react/reacao")
        }]
      );

    } catch (error: any) {
      console.error("Erro no envio:", error);
      const errorMessage = error?.text || "Erro na comunicação com o servidor de e-mail.";
      Alert.alert("Aviso", `Sua trilha foi salva, mas o e-mail falhou: ${errorMessage}`);
      router.replace("/screens/reacao/reacaoScreen");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styleParabens.container}>
      <StatusBar style="light" />
      
      <View style={styleParabens.content}>
       
        <Ionicons name="trophy" size={120} color="#FFD700" />
        <Text style={styleParabens.title}>Uhuu! Parabéns!</Text>
        
        <Text style={styleParabens.message}>
          Você atingiu <Text style={{ fontWeight: 'bold' }}>100% de aproveitamento</Text> em todos os cenários. 
          {"\n\n"}
          Agora você está oficialmente convidado para a nossa 
          <Text style={{ fontWeight: 'bold' }}> simulação presencial</Text>!
          {"\n\n"}
          Clique abaixo para finalizar e receber as instruções detalhadas no seu e-mail.
        </Text>

        <TouchableOpacity 
          style={[styleParabens.button, enviando && { opacity: 0.7 }]} 
          onPress={enviarConviteEmailJS}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#4A0000" />
          ) : (
            <Text style={styleParabens.buttonText}>Finalizar e Enviar Convite</Text>
          )}
        </TouchableOpacity>
        
        {!enviando && (
          <TouchableOpacity 
            style={{ marginTop: 30 }} 
            onPress={() => router.replace("/(auth)/(tabs)/")}
          >
            <Text style={{ color: '#FFF', textDecorationLine: 'underline', fontSize: 16 }}>
              Voltar para o início
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}