import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import api from "../../services/GameApi/api";
import GameList from "../../components/GamesList";
import Header from "../../components/Header";
import { ActivityIndicator, View } from "react-native";

let keyApi = 'd5403774822a4e22be1b215ce2f7e78e'

export default function Category({ id }) {

    const route = useRoute()
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState([])

    const { idCategory } = route?.params




    useEffect(() => {

        setLoading(true)

        async function handleSearchGames() {

            try {
                const response = await api.get('/games', {
                    params: {
                        key: keyApi,
                        genres: idCategory, // Filtrar por gêneros, por exemplo: 4,51ou action,indie.
                        ordering: 'rating-top',// Qual campo usar ao ordenar os resultados.
                        page: 1,//  Um número de página dentro do conjunto de resultados paginado obs: precisa ser passado
                        page_size: '', // Número de resultados a serem retornados por página.
                    }

                })
                const data = response.data.results
                setGames(data)
            } catch (error) {
                console.log(error)

            }
            setLoading(false)

        }
        handleSearchGames()

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
            <Header title={'Categorys'} />
            <AreList>
                <List
                    keyExtractor={item => item.id}
                    data={games}
                    renderItem={({ item }) => <GameList data={item} />}
                />
            </AreList>

        </Background>
    )
}

const Background = styled.SafeAreaView`
    flex: 1;
    background-color: #050B18;
    padding: 2%;
`;

const List = styled.FlatList``; // Lista de Categorias e tambem lista de jogos

const AreList = styled.View`
    flex: 1;
`;