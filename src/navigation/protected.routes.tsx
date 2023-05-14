import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'
import { useTheme } from 'react-native-paper';
import FaqDetail from '../screens/faqDetail';
import SplashScreen from '../screens/splash';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const ProtectedRoutes = () => {
const theme=useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        statusBarColor: theme.colors.inverseOnSurface,
        statusBarTranslucent:true,
        statusBarStyle: 'dark'
      }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="FaqDetail" component={FaqDetail} />
    </Stack.Navigator>
  );
};

export default ProtectedRoutes;
