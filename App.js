import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView } from 'react-native';
import SafeView from './src/components/SafeView';
import StackNavigation from './src/components/Navigation/StackNavigation';


export default function App() {
  return (
    <SafeAreaView style={SafeView.AndroidSafeArea}>
       <StackNavigation/>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
