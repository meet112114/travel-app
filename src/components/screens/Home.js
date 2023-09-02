import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import FlatListSrc from "./Flatlist";

const Home = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "while", alignItems: "center" }}
    >
      <FlatListSrc />
    </SafeAreaView>
  );
};

export default Home;
