import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import GameList from "../../components/GamesList";
import Header from "../../components/Header";
import { ActivityIndicator, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../services/GameApi/api";

let keyApi = 'd5403774822a4e22be1b215ce2f7e78e'

export default function Search() {
    const route = useRoute()
    const { inputText } = route?.params

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function handleSearchGame() {
            try {
                const response = await api.get('/games', {
                    params: {
                        key: keyApi,
                        search: inputText, // Filtrar por nome 
                        search_exact: true,
                        ordering: 'name',// Qual campo usar ao ordenar os resultados.
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
        handleSearchGame()
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
            <Header title={'Search'} />

            {games.length === 0 ? (<Label>
                Não encontramos um jogo com esse nome...
            </Label>) : (<AreList>
                <List
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    data={games}
                    renderItem={({ item }) => <GameList data={item} />}
                />
            </AreList>)
            }
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
const Label = styled.Text`
    margin-top: 20px;
    text-align: center;
    color: #ffff;
`;