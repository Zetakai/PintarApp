import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/login'


const Stack = createNativeStackNavigator();

const PublicRoutes=() => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false,statusBarTranslucent:true,statusBarColor:'transparent'}}>

      <Stack.Screen name="Login" component={Login} />

    </Stack.Navigator>
  );
};

export default PublicRoutes;
