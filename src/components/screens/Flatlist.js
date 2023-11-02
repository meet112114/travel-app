import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ScrollViewComponent,
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "react-native-paper";

const FlatListSrc = () => {
  const url = { your backend/server url }
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [data, setdata] = useState("");
  const [oldData, setOldData] = useState();
  const [refreshCount, setRefreshCount] = useState(0);

  const fetchData = async () => {
    try {
      axios
      .get(url)
      .then(function (response) {
        // handle response
        setdata(response.data.placedata);
        setOldData(response.data.placedata);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const autoRefreshData = () => {
    fetchData();

    // Set a timeout to auto-refresh 2 times if data is not fetched within 1 second
    setTimeout(() => {
      if (data.length === 0 && refreshCount < 2) {
        setRefreshCount(refreshCount + 1);
        autoRefreshData();
      }
    }, 1000);
  };

  useEffect(() => {
    autoRefreshData(); // Initial data fetch and auto-refresh
  }, []);



  const onSearch = (text) => {
    if (text == "") {
      setdata(oldData);
    } else {
      let templist = data.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setdata(templist);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("placeinfo", { item })}
    >
      <View>
        <View style={styles.flatlistcontainer}>
          <Image source={{ uri: item.image }} style={styles.imgstyle} />
          <View style={styles.infostyle}>
            <Text style={styles.titlestyle}>{item.title}</Text>
            <Text style={styles.descriptionstyle}>{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  
 
  return (
   <View>
      <Appbar.Header>
    <View style={styles.searchcontainer}>
      <Appbar.Content />
      <View style={styles.topbar}>
        <Image
          source={require("../icons/micon.png")}
          style={styles.micon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
          value={search}
          onChangeText={(txt) => {
            onSearch(txt);
            setSearch(txt);
          }}
        />
      </View>
    </View>
  </Appbar.Header>
          
  <View style={styles.mbody}>
     
     <View style={styles.catcon}>
       <View style={styles.row}>
         <TouchableOpacity
           onPress={() =>
             navigation.navigate("categoryscreen", {
               cat: "hills",
               data,
             })
           }
         >
           <View style={styles.catconobj}>
             <Text style={styles.cattext}>Hills</Text>
           </View>
         </TouchableOpacity>
         <TouchableOpacity
           onPress={() =>
             navigation.navigate("categoryscreen", {
               cat: "water",
               data,
             })
           }
         >
           <View style={styles.catconobj}>
             <Text style={styles.cattext}>Water</Text>   
           </View>
         </TouchableOpacity>
       </View>
       <View style={styles.row}>
         <TouchableOpacity
           onPress={() =>
             navigation.navigate("categoryscreen", {
               cat: "historical",
               data,
             })
           }
         >
           <View style={styles.catconobj}>
             <Text style={styles.cattext}>Forts</Text>
           </View>
         </TouchableOpacity>
         <TouchableOpacity
           onPress={() =>
             navigation.navigate("categoryscreen", {
               cat: "famous",
               data,
             })
           }
         >
           <View style={styles.catconobj}>
               <Text style={styles.cattext}>Famous</Text>
           </View>
         </TouchableOpacity>
       </View>
     </View>
     
     <View style={styles.midcon}>
       <Text
         style={{

           fontWeight: 700,
           color: "grey",
           fontSize: 16,
           alignSelf: "center",
         }}
       >
         All Places
       </Text>
     </View>
     </View>

        <View style={styles.maincontainer}>
          <FlatList
            blurRadius={90}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          
          />
        </View>
   </View>
    
  );
};

export default FlatListSrc;

const styles = StyleSheet.create({
  cattext:{
    textTransform:"uppercase",
    fontWeight:"500",
    fontFamily:"monospace"
  },
  midcon: {
    marginBottom:5,
    justifyContent: "center",
    height: 30,
    width: 390,
    backgroundColor: "white",
  },
  topbar: {
    flexDirection: "row",
  },
  micon: {
  
    marginLeft: 10,
    height: 50,
    width: 65,
  },
  icon: {
    height: 100,
    width: 150,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
  },
  catconobj: {
    marginBottom: 10,
    width: 150,
    height: 40,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  catcon: {
    marginTop: 10,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mbody: {
    backgroundColor: "#E0E0E0",
  },
  searchcontainer: {
    backgroundColor: "#FDFDFD",
    width: 220,
  },
  maincontainer: {
    marginTop: 10,
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#A5A5A5",
    marginLeft: 60,
    width: 240,
    padding: 10,
    height: 45,
    marginBottom: 7,
    borderRadius: 15,
    marginTop: 3,
  },
  flatlistcontainer: {
    backgroundColor: "#EDEDED",
    borderRadius: 20,
    marginRight: 10,
    height: 120,
    width: 370,
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
  imgstyle: {
    marginTop: 20,
    borderRadius: 10,
    height: 95,
    width: 90,
    alignSelf: "center",
    marginLeft: 10,
  },
  infostyle: {
    marginTop: 10,
    marginLeft: 15,
    width: 250,
  },
  titlestyle: {
    textTransform: "capitalize",
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },
  descriptionstyle: {
    color: "grey",
    fontSize: 10,
    fontWeight: "300",
    width:"100"
  },
});
