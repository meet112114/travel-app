import { View, Text, StyleSheet , Image} from 'react-native'
import React from 'react'
import { Linking } from 'react-native';
import ImageSlider from './ImageSlider';


const PlaceInfo = ({route}) => {
    const { item } = route.params;    

  const imglinks = item.images;
  console.log(item.images);
  const imgs = item.images.split(",");
    

  return (
    <View style={styles.mainbody}>
      <Text style={styles.maintitle}>{item.title} </Text>
      <Image source={{ uri: item.image}} style={styles.imgstyle} />
      <Text style={styles.descriptionstyle}>{item.description}</Text>
      <Text style={styles.locaions} onPress={() => Linking.openURL(item.location)}>
      Click For Locaion
      </Text>
      <ImageSlider key={item._id} images={imgs} />
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
        paddingTop:50,
        fontSize:40
    },
    imgstyle:{
      marginTop:50,
      height:200,
      width:300
    },
    descriptionstyle:{
      paddingTop:50,
      width:300,
      fontSize:15,
      color:"grey",
    },
    locaions:{
      paddingTop:50,
      fontSize:20,
    }


}) 