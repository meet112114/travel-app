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
  const url = "http://192.168.208.183:5000/getdata";
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [data, setdata] = useState(data);
  const [oldData, setOldData] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle response
        setdata(response.data.placedata);
        setOldData(response.data.placedata);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    <View style={styles.mbody}>
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

      <ScrollView>
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
                <Image
                  source={require("../icons/hills.png")}
                  style={styles.icon}
                />
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
                <Image
                  source={require("../icons/water.png")}
                  style={styles.icon}
                />
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
                <Image
                  source={require("../icons/histo.png")}
                  style={styles.icon}
                />
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
                <Image
                  source={require("../icons/famous.png")}
                  style={styles.icon}
                />
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
        <View style={styles.maincontainer}>
          <FlatList
            nestedScrollEnabled
            blurRadius={90}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FlatListSrc;

const styles = StyleSheet.create({
  midcon: {
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
    height: 60,
    width: 85,
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
    marginBottom: 15,
    width: 150,
    height: 100,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  catcon: {
    marginTop: 15,
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
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#A5A5A5",
    marginLeft: 40,
    width: 240,
    padding: 10,
    height: 45,
    marginBottom: 1,
    borderRadius: 15,
    marginTop: 5,
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
    width: 300,
  },
  titlestyle: {
    textTransform: "capitalize",
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },
  descriptionstyle: {
    color: "grey",
    fontSize: 12,
    fontWeight: "300",
  },
});
