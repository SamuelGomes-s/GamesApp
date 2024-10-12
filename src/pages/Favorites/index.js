import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import GameList from "../../components/GamesList";
import Header from "../../components/Header";
import { ActivityIndicator, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../services/GameApi/api";

let keyApi = 'd5403774822a4e22be1b215ce2f7e78e'

export default function Favorites() {



    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

    }, [])



    if (loading) {
        return (
            <Background>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={"large"} color={'#FFFF'} />
                </View>
            </Background>
        )

    }

    return (
        <Background>
            <Header title={'My favorites'} />


        </Background>
    )
}

const Background = styled.SafeAreaView`
    flex: 1;
    background-color: #050B18;
    padding: 2%;
`;

const List = styled.FlatList``; // Lista de Categorias e tambem lista de jogos

const AreaList = styled.View`
    flex: 1;
`;
const Label = styled.Text`
    margin-top: 20px;
    text-align: center;
    color: #ffff;
`;