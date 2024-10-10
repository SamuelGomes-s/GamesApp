import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Category from "../pages/Category";

const Stack = createNativeStackNavigator()

export default function AppRoutes() {

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Category" component={Category} />
        </Stack.Navigator>
    )
}