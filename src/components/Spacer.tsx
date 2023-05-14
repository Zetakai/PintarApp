import { View, Text } from 'react-native'
import React from 'react'

export default function Spacer(props) {
  return (
    <View style={{height:props.height?props.height:12}}>
      
    </View>
  )
}