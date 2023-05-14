import {Image, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Snackbar, TextInput, useTheme} from 'react-native-paper';
import useVM from './login.vm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import Spacer from '../../components/Spacer';

import {Typography} from '../../theme/Typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import { BASE_API } from '../../api/base_url';
import Lottie from 'lottie-react-native';

export default function Login({navigation}) {
  const {
    nip,
    password,
    Hide,
    onSetHide,
    onChangePassword,
    onChangeNip,
    Message,
    Visible,
    onSetVisibleHide,onSetVisible
  } = useVM();
  const theme = useTheme();
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  // const accounts = useSelector(state => state.accounts);
  async function handleLogin() {
    try {
      const response = await fetch(`${BASE_API}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nip, password }),
      });
      if (!response.ok) {

        throw new Error('Invalid credentials');
      }
      const {data} = await response.json();
      console.log(data)
      
      dispatch({type: 'USER-AUTH', payload: true});
      dispatch({type: 'LOGIN-AUTH', payload: data});

    } catch (error) {
      onSetVisible(error.message);
    }
  }


  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Image
        resizeMode="stretch"
        style={{
          height: '10%',
          width: window.width,
          position: 'absolute',
          top: 0,
        }}
        source={require('../../assets/images/background1.png')}
      />
      <Image
        resizeMode="stretch"
        style={{
          height: '30%',
          width: '20%',
          position: 'absolute',
          left: 0,
          bottom: 0,
        }}
        source={require('../../assets/images/background2.png')}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
          paddingBottom: 20,
          // marginTop: ms(-50),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={[Typography.h1, {color: theme.colors.primary}]}>
            Login
          </Text>
          <Icon name="account-circle" size={30} color={'black'} />
        </View>
        <Spacer height={ms(20)} />
        <View style={{width: ms(300), height: ms(300), alignSelf: 'center'}}>
          <Lottie
            source={require('../../assets/animations/login.json')}
            autoPlay
            loop
          />
        </View>

        <View style={{paddingHorizontal: ms(20)}}>
          <TextInput
            theme={{roundness: 10}}
            mode="outlined"
            label="Email"
            value={nip}
            onChangeText={onChangeNip}
          />
          <Spacer height={ms(10)} />
          <TextInput
            theme={{roundness: 10}}
            mode="outlined"
            label="password"
            value={password}
            secureTextEntry={Hide}
            right={
              <TextInput.Icon
                onPress={onSetHide}
                icon={Hide ? 'eye-off' : 'eye'}
              />
            }
            onChangeText={onChangePassword}
          />
          <Spacer height={ms(10)} />
          <Button mode="contained" onPress={handleLogin}>
            Login
          </Button>

        </View>
      </KeyboardAwareScrollView>
      <Snackbar
        style={{borderRadius: 10}}
        visible={Visible}
        onDismiss={onSetVisibleHide}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onSetVisibleHide;
          },
        }}>
        {Message}
      </Snackbar>
    </SafeAreaView>
  );
}
