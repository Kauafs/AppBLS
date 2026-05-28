import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView, StatusBar, Platform } from "react-native";

export interface SplashProps {
  onFinish: () => void;
}

export default function CustomSplashScreen({ onFinish }: SplashProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
    
    
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  const handleAnimationFinish = () => {
   
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync("visible");
    }
    
    onFinish();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
      <LottieView
        ref={animationRef}
        onAnimationFinish={handleAnimationFinish}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
        source={require('../assets/images/lottie_citec.json')} 
        autoPlay={false}
        loop={false}
      />
    </SafeAreaView>
  );
}