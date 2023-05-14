import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ms} from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';
import MainTab from '../screens/maintab';
import MainTabIcon from 'react-native-vector-icons/AntDesign'
import Profile from '../screens/profile';
import ProfileIcon from 'react-native-vector-icons/Feather'
import { Typography } from '../theme/Typography';

export default function TabNavigator(props) {
  const Tab = createBottomTabNavigator();
  const theme=useTheme()
  const window=useWindowDimensions()
  const isLandscape=window.width>window.height
  return (
    <Tab.Navigator
    
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tertiary,
        tabBarInactiveTintColor: theme.colors.backdrop,
        tabBarStyle: {
          // height: ms(84),
          // paddingTop: ms(12),
          // paddingBottom: ms(24),
          // backgroundColor: theme.colors.white1,
          // elevation: 24,
          // borderTopLeftRadius: ms(20),
          // borderTopRightRadius: ms(20),
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel:!isLandscape
      }}>
      <Tab.Screen
        name="MainTab"
        component={MainTab}
        options={{

          tabBarIcon: ({color}) => {
            return <MainTabIcon name="home" size={ms(25)} color={color} />;
          },
          tabBarLabel: ({color}) => (
            <Text style={[Typography.b2,{color}]}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{

          tabBarIcon: ({color}) => {
            return <ProfileIcon name="user" size={ms(25)} color={color} />;
          },
          tabBarLabel: ({color}) => (
            <Text style={[Typography.b2,{color}]}>
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
