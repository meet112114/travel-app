import { View, Text , SafeAreaView } from 'react-native'
import React from 'react'
import FlatListSrc from './Flatlist'

const Home = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"while",alignItems:"center"}}>
       <Text> home</Text>
       <FlatListSrc/>
    </SafeAreaView>
  )
}

export default Home