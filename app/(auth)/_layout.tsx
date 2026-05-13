import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../components/drawer'; 

export default function AuthLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 300 },
      }}
    >
      <Drawer.Screen 
        name="(tabs)" 
        options={{ drawerItemStyle: { display: 'none' } }} 
      />
      <Drawer.Screen 
        name="initialQuiz" 
        options={{ drawerItemStyle: { display: 'none' } }} 
      />
    </Drawer>
  );
}