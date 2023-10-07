import { View, Text, StyleSheet , Image} from 'react-native'
import React from 'react'
import { Linking } from 'react-native';
import ImageSlider from './ImageSlider';
import { Appbar } from 'react-native-paper';


const PlaceInfo = ({route}) => {
    const { item } = route.params;    

  const imglinks = item.images; 
  const imgs = item.images.split(",");
    

  return (
    
    <View style={styles.mainbody}>
      <Appbar style={styles.line}></Appbar>
      <Text style={styles.maintitle}>{item.title} </Text>
      <Appbar style={styles.line1}></Appbar>
      <ImageSlider key={item._id} images={imgs} />
      <Appbar style={styles.line2}></Appbar>
      <Text style={{fontSize:20}}>Description</Text>
      <Appbar style={styles.line}></Appbar>
      <Text style={styles.descriptionstyle}>{item.description}</Text>
      <Text style={styles.locaions} onPress={() => Linking.openURL(item.location)}>
      Click For Locaion
      </Text>
      
    </View>
  )
}

export default PlaceInfo

const styles = StyleSheet.create({
    mainbody:{
        marginTop: 10,
        alignItems: "center"
    },
    maintitle:{
        textTransform:"capitalize",
        fontFamily:'Roboto' ,
        fontWeight:'bold',
        color:'#343a40',
        paddingTop:10,
        fontSize:30
    },
    descriptionstyle:{
      fontFamily:'serif',
      paddingTop:15,
      width:300,
      fontSize:15,
      textTransform:'capitalize',
      textAlign:'center',
      color:"grey",
    },
    locaions:{
      fontFamily:'serif',
      color:'darkblue',
      paddingTop:50,
      fontSize:20,
    },
    line:{
      marginTop:10,
      width:390 ,
      height:5
    },
    line1:{
      marginTop:10,
      marginBottom:30,
      width:390 ,
      height:5
    },
    line2:{
      marginTop:40,
      marginBottom:10,
      width:390 ,
      height:5
    },
    imgslider:{
      marginTop:20,
      paddingTop:50
    }

}) 