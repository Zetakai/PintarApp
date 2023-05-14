import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  Appbar,
  Button,
  Card,
  Modal,
  Portal,
  Provider,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useVM from './profile.vm';
import {Typography} from '../../theme/Typography';
import Spacer from '../../components/Spacer';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function Profile() {
  const theme = useTheme();
  const data=useSelector(state=>state.data)
  const {handleLogout, visible, showModal, hideModal} = useVM();
  const menu = [
    {icon: 'cart-variant', title: 'My Cart'},
    {icon: 'message-text-outline', title: 'Messages'},
    {icon: 'cards-heart-outline', title: 'Favourites'},
    {icon: 'cog-outline', title: 'Settings'},
  ];
  const RenderModal = () => (
    // <Provider>
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          marginHorizontal:'15%',
          width: '70%',
          borderRadius: 25,
        }}>
        <Text
          style={[
            Typography.h3,
            {color: theme.colors.onBackground, textAlign: 'center'},
          ]}>
          Are you sure you want to log out?
        </Text>
        <Spacer height={ms(20)} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={hideModal}
            style={{
              height: 40,
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                Typography.b2,
                {
                  color: theme.colors.error,
                },
              ]}>
              Cancel
            </Text>
          </Pressable>
          <Button
            onPress={handleLogout}
            style={{width: '50%',minWidth:100}}
            mode="contained-tonal">
            Logout
          </Button>
        </View>
      </Modal>
    </Portal>
    // </Provider>
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Image
        resizeMode="stretch"
        style={{
          height: 100,
          width: '20%',
          position: 'absolute',
          right: 0,
          bottom: 0,transform:[{scaleX:-1}]
        }}
        source={require('../../assets/images/background3.png')}
      />
      <Appbar.Header statusBarHeight={0} mode="center-aligned" elevated>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="logout" onPress={showModal} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 30,
          flexGrow: 1,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: theme.colors.outlineVariant,
            width: ms(126),
            height: ms(126),
            borderRadius: ms(126),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: ms(120),
              height: ms(120),
              borderRadius: ms(120),
            }}
            source={{uri:data.path_foto}}
          />
        </View>
        <Spacer height={ms(10)}/>
        <Text style={[Typography.h2,{color:"black",alignSelf:'center'}]}>{data.name}</Text>
        <Text style={[Typography.b2,{color:"black",alignSelf:'center'}]}>{data.email}</Text>
        <Spacer height={ms(40)} />
        {menu.map((x, i) => (
          <TouchableOpacity
            key={i}
            style={{
              borderWidth: 1,
              marginBottom: 10,
              flexDirection: 'row',
              width: '100%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',backgroundColor:theme.colors.inverseOnSurface
            }}>
            <Icon
              style={{position: 'absolute', left: 15}}
              name={x.icon}
              size={25}
              color={'black'}
            />
            <Text
              style={[
                Typography.b1,
                {color: theme.colors.primary, alignSelf: 'center'},
              ]}>
              {x.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <RenderModal />
    </SafeAreaView>
  );
}
