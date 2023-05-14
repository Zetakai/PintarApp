import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  useTheme,
} from 'react-native-paper';
import Create from 'react-native-vector-icons/FontAwesome';
import useVM from './maintab.vm';
import {Typography} from '../../theme/Typography';
import Spacer from '../../components/Spacer';
import {ms} from 'react-native-size-matters';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useWindowDimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
export default function MainTab({navigation}) {
  const theme = useTheme();
  const data = useSelector(state => state.data);
  const window = useWindowDimensions();
  const {faqData, fetchFaqData, loading, error} = useVM();
  const [onEndReached, setOnEndReached] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchFaqData();
    }, []),
  );
  const callOnEndReached = ({distanceFromEnd}) => {
    if (!onEndReached) {
      fetchFaqData(true);
      setOnEndReached(false);
    }
  };
  const LeftContent = props => <Avatar.Icon {...props} icon="chat-question" />;
  const renderItem = ({item}) => (
    <Card
      style={{marginHorizontal: ms(16), marginBottom: ms(8)}}
      onPress={() => navigation.navigate('FaqDetail', {id: item.id,isCreating:false})}>
      <Card.Title
        title="Pertanyaan"
        titleVariant="titleMedium"
        left={LeftContent}
      />
      <Card.Content>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {item.pertanyaan}
        </Text>
        <Text style={{color: 'black'}}>{item.jawaban}</Text>
      </Card.Content>
      {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
    </Card>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="small" />;
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 15,
      }}>
      <Image
        resizeMode="stretch"
        style={{
          height: 130,
          width: '50%',
          position: 'absolute',
          right: 0,
          top: 0,
          transform: [{scaleX: -1}, {scaleY: -1}],
        }}
        source={require('../../assets/images/background3.png')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <Image
          style={{width: ms(40), height: ms(40), marginLeft: -8}}
          source={require('../../assets/images/logo.jpeg')}
        />
        <TouchableOpacity
        onPress={()=>{navigation.navigate('FaqDetail',{id:null,isCreating:true})}}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Create
            name="pencil-square-o"
            size={ms(25)}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
      <Spacer height={ms(15)} />
      <Text
        style={[
          Typography.h1,
          {color: theme.colors.secondary, marginLeft: 15},
        ]}>
        Faq
      </Text>
      <Spacer height={ms(15)} />
      <FlatList
        contentContainerStyle={{paddingTop: ms(8)}}
        data={faqData}
        renderItem={renderItem}
        initialNumToRender={10}
        keyExtractor={(item, index) => String(index)}
        onMomentumScrollBegin={() => {
          setOnEndReached(false);
        }}
        onEndReached={callOnEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
