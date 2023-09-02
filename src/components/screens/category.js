import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Category = ({ route }) => {
  const navigation = useNavigation();
  const { cat } = route.params;
  const { data } = route.params;
  const [search, setSearch] = useState("");
  let tempdata = data.filter((item) => {
    return item.category.includes(cat);
  });

  const [data1, setdata1] = useState(tempdata);
  const [oldData, setOldData] = useState(tempdata);

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

  const onSearch = (text) => {
    if (text == "") {
      setdata1(oldData);
    } else {
      let templist = data1.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setdata1(templist);
    }
  };

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
      <View style={styles.midcon}>
        <Text
          style={{
            fontWeight: 700,
            color: "grey",
            fontSize: 16,
            textTransform: "capitalize",
            alignSelf: "center",
          }}
        >
          {cat}
        </Text>
      </View>

      <View style={styles.maincontainer}>
        <FlatList
          blurRadius={90}
          data={data1}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  midcon: {
    marginTop: 15,
    justifyContent: "center",
    height: 30,
    width: 390,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
  catconobj: {
    borderWidth: 1,
    width: 100,
    height: 100,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
  catcon: {
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
    width: 390,
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
    marginLeft: 50,
    width: 250,
    padding: 10,
    marginBottom: 7,
    borderRadius: 15,
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
    width: 80,
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
  topbar: {
    flexDirection: "row",
  },
  micon: {
    height: 60,
    width: 85,
  },
  icon: {
    height: 100,
    width: 150,
    resizeMode: "contain",
  },
});

export default Category;
