import { FlatList , StyleSheet , View ,Text , Image , TouchableOpacity  } from "react-native";
import React    from "react";
import { useNavigation } from "@react-navigation/native";
import { useState , useEffect} from "react";
import axios from "axios";


const FlatListSrc = () => {
    
    const [data , setData] = useState();
    const url = "http://192.168.1.106:5000/getdata" ;
    const navigation = useNavigation();


        useEffect(() => {
          axios.get(url)
        .then(function(response) {
            // handle response            
            setData(response.data.placedata);
        }).catch(function(error) {
           console.log(error)
        });

        }, [])
        
         
         
        

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={()=> navigation.navigate("placeinfo", {item})}>
            <View>
            <View style={styles.flatlistcontainer}>
                            
                        <Image source={{uri : item.image}} style={styles.imgstyle} />
                        <View style={styles.infostyle}>

                            <Text style={styles.titlestyle}>{item.title}</Text>    
                            <Text style={styles.descriptionstyle}>{item.description}</Text>

                        </View>
                    
                    </View>
            </View>
        </TouchableOpacity>
    );
        
    return(                  
            <FlatList data={data} renderItem={renderItem} keyExtractor={item => item._id.toString()}/>
    );

};

export default FlatListSrc;

const styles = StyleSheet.create({
    flatlistcontainer: {        
        height:120,
        width:400,
        flexDirection:"row",
        paddingTop:30,
        paddingBottom:30,
        marginLeft:10
    },
    imgstyle:{
        height:90,
        width:80
    },
    infostyle:{
        marginLeft:10,
        width:300
    },
    titlestyle:{
        color:"black",
        fontSize:18
    },
    descriptionstyle:{
        color:"grey",
        fontSize:10
    }
})