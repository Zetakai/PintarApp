import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  Appbar,
  Button,
  Card,
  Divider,
  Menu,
  Modal,
  Portal,
  Provider,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useVM from './faqDetail.vm';
import {Typography} from '../../theme/Typography';
import Spacer from '../../components/Spacer';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

export default function FaqDetail({navigation,route}) {
  const theme = useTheme();
  const data = useSelector(state => state.data);
  const {
    visible,
    visibleModal,
    openMenu,
    closeMenu,
    pertanyaan,
    setPertanyaan,
    jawaban,
    setJawaban,
    onChangePertanyaan,
    onChangeJawaban,
    updating,
    setUpdating,
    startUpdating,
    finishUpdating,
    showModal,
    hideModal,
    faqData,
    loading,
    error,
    fetchDetail,
    updateFaq,
    deleteFaq,
    createFaq
  } = useVM();
  useEffect(() => {
    !route.params.isCreating&&fetchDetail(route.params.id);
  }, []);

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
        visible={visibleModal}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          marginHorizontal: '15%',
          width: '70%',
          borderRadius: 25,
        }}>
        <Text
          style={[
            Typography.h3,
            {color: theme.colors.onBackground, textAlign: 'center'},
          ]}>
          Are you sure you want to delete the post?
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
            onPress={()=>deleteFaq(route.params.id)}
            style={{width: '50%', minWidth: 100}}
            mode="contained-tonal">
            Delete
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
          bottom: 0,
          transform: [{scaleX: -1}],
        }}
        source={require('../../assets/images/background3.png')}
      />
      <Appbar.Header statusBarHeight={0} mode="center-aligned" elevated>
      <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <Appbar.Content title={route.params.isCreating?"Create Faq":"Faq Detail"} />
        <Menu
          style={{marginTop: 40}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          {updating?<Menu.Item onPress={finishUpdating} title="Cancel Updating" />:<Menu.Item onPress={startUpdating} title="Update Faq" />}
          <Menu.Item onPress={showModal} title="Delete Faq" />
        </Menu>
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 30,
          flexGrow: 1,
          marginHorizontal: 20,
        }}>
        <Text style={[Typography.h1, {color: 'black', fontWeight: 'bold'}]}>
          Pertanyaan :
        </Text>
        {updating||route.params.isCreating ? (
          <TextInput
          mode='outlined'
            multiline
            
            value={pertanyaan}
            onChangeText={onChangePertanyaan}
          />
        ) : (
          <Text style={[Typography.h2, {color: 'black'}]}>
            {faqData?.pertanyaan}
          </Text>
        )}
        <Spacer />
        
          <Text style={[Typography.h1, {color: 'black', fontWeight: 'bold'}]}>
            Jawaban :
          </Text>
        
        {updating||route.params.isCreating ? (
          <TextInput
          mode='outlined'
            multiline
            
            value={jawaban}
            onChangeText={onChangeJawaban}
          />
        ) : (<Text style={[Typography.h2, {color: 'black'}]}>
          {faqData?.jawaban}
        </Text>)}
        {updating||route.params.isCreating&&<Button style={{marginTop:ms(20)}} icon="post" mode="contained-tonal" onPress={()=>{route.params.isCreating?createFaq():updateFaq(route.params.id)}}>
    {route.params.isCreating?"Post Faq":"Post Update"}
  </Button>}
      </ScrollView>
      <RenderModal />
    </SafeAreaView>
  );
}
