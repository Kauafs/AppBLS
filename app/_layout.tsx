import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreenNative from "expo-splash-screen";
import CustomSplashScreen from "../components/Splash"; // Vamos criar/ajustar esse componente abaixo

// Impede que a tela branca do app.json suma sozinha
SplashScreenNative.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Simula que o app carregou as configurações básicas e esconde a tela estática
    async function prepare() {
      try {
        // Se tiver carregamento de fontes ou dados iniciais, coloque aqui
        await new Promise((resolve) => setTimeout(resolve, 500)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // Esconde a tela branca nativa do app.json, revelando a nossa animação Lottie
        await SplashScreenNative.hideAsync();
      }
    }

    prepare();
  }, []);

  // Se o app não estiver pronto, mantém parado na tela estática branca
  if (!appIsReady) {
    return null;
  }

  // Se a animação do Lottie ainda NÃO terminou, renderiza a tela com o Lottie
  if (!animationFinished) {
    return <CustomSplashScreen onFinish={() => setAnimationFinished(true)} />;
  }

  // Quando a animação acaba, o app segue para o fluxo normal de telas (Ex: index, login)
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* Suas outras rotas de páginas aqui */}
    </Stack>
  );
}