import React from 'react'
import { FlatList , StyleSheet , View ,Text , Image , TouchableOpacity , Button  } from "react-native";

const Category = () => {
  return (
    <View style={styles.container}>
    <View style={styles.buttonContainer}>
     <Button title="Button 1" />
   </View>
   <View style={styles.buttonContainer}>
     <Button title="Button 2"/>
   </View>
   <View style={styles.buttonContainer}>
     <Button title="Button 1"/>
   </View>
   <View style={styles.buttonContainer}>
     <Button title="Button 2"/>
   </View>
 </View>
 

  )
}

const styles = StyleSheet.create({
    container: {
        height:50,      
      flexDirection: 'row',
      marginTop:10,
    //   justifyContent: 'center',
    },
    buttonContainer: {
      width:10,
      flex: 1,
      alignItems:"center",
    }
  });

export default Category