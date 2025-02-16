import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesGames from "../../components/FavoriteGames";

export default function Favorites() {

    const [games, setGames] = useState([])

    useEffect(() => {
        async function favoritesGames() {
            try {
                const storageLocal = await AsyncStorage.getItem("@games")
                let favorites = storageLocal ? JSON.parse(storageLocal) : []
                setGames(favorites)
            } catch (error) {
                console.log(error)
            }
        }
        favoritesGames()
    }, [games])

    return (
        <Background>
            <Header title={'My favorites'} />
            <AreaList>
                <List data={games} renderItem={({ item }) => <FavoritesGames data={item} gameLocal={setGames} />} />
            </AreaList>
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