import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import Detail from "../Detail";

const Stack = createNativeStackNavigator()

export default function AppRoutes() {

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}