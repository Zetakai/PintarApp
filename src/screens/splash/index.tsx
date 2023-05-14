import {
    View,
    StatusBar,
    Animated,
    Image,
    useWindowDimensions,
  } from 'react-native';
  import React, {useEffect, useRef} from 'react';

  import { useSelector } from 'react-redux';
  
  export default function SplashScreen(props) {
    const window= useWindowDimensions()

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      // if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      // } else if (!visible) {
      //   Animated.timing(fadeAnim, {
      //     toValue: 0,
      //     duration: 1000,
      //     useNativeDriver: true,
      //   }).start();
      // }
    }, []);
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Animated.View
          style={{
            opacity: fadeAnim,
            justifyContent: 'center',
            alignItems: 'center',
          }}
  
          // entering={FadeIn.duration(1000)}
          // exiting={SlideOutUp.duration(1000)}
        >
          <Image
            resizeMode='center'
            // style={{height: window.width , width: window.width }}
            source={require('../../assets/images/logo.jpeg')}
          />
        </Animated.View>
      </View>
    );
  }
  