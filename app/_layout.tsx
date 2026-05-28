import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreenNative from "expo-splash-screen";
import CustomSplashScreen from "../components/Splash"; 


SplashScreenNative.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    
    async function prepare() {
      try {
     
        await new Promise((resolve) => setTimeout(resolve, 500)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        
        await SplashScreenNative.hideAsync();
      }
    }

    prepare();
  }, []);


  if (!appIsReady) {
    return null;
  }

  if (!animationFinished) {
    return <CustomSplashScreen onFinish={() => setAnimationFinished(true)} />;
  }

  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}