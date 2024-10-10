import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Routes from "./src/routes";
import { SafeAreaView, StatusBar } from "react-native";



export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#050B18'} barStyle={"light-content"} />
      <Routes />
    </NavigationContainer>

  )
}