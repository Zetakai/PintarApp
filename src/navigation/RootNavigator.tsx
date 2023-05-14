import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import PublicRoutes from './public.routes';
import ProtectedRoutes from './protected.routes';
import SplashScreen from '../screens/splash';

const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const showSplash = useSelector(state => state.showSplash);
  const renderStackScreen = React.useMemo(() => {
    if (showSplash) {
      return <Stack.Screen name="Splash" component={SplashScreen} />;
    }
    if (!!isLoggedIn) {
      return <Stack.Screen name="protected" component={ProtectedRoutes} />;
    }

    return <Stack.Screen name="public" component={PublicRoutes} />;
  }, [isLoggedIn, showSplash]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // statusBarTranslucent: true,
          // statusBarColor: 'transparent',
          // statusBarStyle: 'dark',
        }}>
        {renderStackScreen}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
