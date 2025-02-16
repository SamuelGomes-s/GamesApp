import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import SearchIcon from 'react-native-vector-icons/Ionicons'
import FavIcon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator, Text, View } from "react-native";
import api from "../../services/GameApi/api";
import CategoryList from "../../components/CategoryList";
import GameList from "../../components/GamesList";
import { useNavigation } from "@react-navigation/native";

let keyApi = 'd5403774822a4e22be1b215ce2f7e78e'

export default function Home() {

    const gamesPerPage = 5
    const [categorys, setCategorys] = useState([])
    const [games, setGames] = useState([])
    const [loadingHome, setLoadingHome] = useState(false)
    const [inputText, setInputText] = useState('')
    const [pageGames, setPageGames] = useState(1)
    const [loadingGames, setLoadingGames] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        setInputText('')
        setLoadingHome(true)
        async function lookingFor() {
            try {
                await Promise.all([handleCategorys(), HandleGames()]) // Promisse.all permite a busca ao mesmo tempo dos dois dados, categorias e games...
            } catch (error) {
                console.log(error)
            }
            setLoadingHome(false)
        }
        lookingFor()
    }, [])

    async function handleCategorys() {
        try {
            const response = await api.get('/genres', {
                params: {
                    key: keyApi,
                    ordering: 'name',// Qual campo usar ao ordenar os resultados.
                    page: 1,//  Um número de página dentro do conjunto de resultados paginado obs: precisa ser passado
                    page_size: '', // Número de resultados a serem retornados por página.
                }
            }
            )
            const data = response.data.results
            setCategorys(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function HandleGames() {
        try {
            const response = await api.get('/games', {
                params: {
                    key: keyApi,
                    ordering: 'rating_top',
                    page: pageGames,
                    page_size: gamesPerPage,
                }
            })
            const data = response.data.results
            if (pageGames <= 1) {
                setGames(data)
            } else {
                setGames([...games, ...data])
            }
            setPageGames(pageGames + 1)
            setLoadingGames(false)
        } catch (error) {
            console.log(error)
        }
    }

    function scrollPage() {
        if (!loadingGames) {
            setLoadingGames(true)
            HandleGames()
        }
    }

    if (loadingHome) {
        return (
            <Background>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={"large"} color={'#FFFF'} />
                </View>
            </Background>
        )
    }

    function searchGame() {
        if (inputText == '') return;
        navigation.navigate('Search', { inputText })
    }
    function favorites() {
        return navigation.navigate('Favorites')
    }

    return (
        <Background>
            <Header>
                <ContentHeader>
                    <NameApp colorText={'#ffffff'}> Games<NameApp colorText={'#ff455f'}>APP</NameApp></NameApp>
                    <Button BG={'#64748b'} onPress={() => favorites()}>
                        <View>
                            <FavIcon name='bookmarks-outline' color={'#ffffff'} size={20} />
                        </View>
                    </Button>
                </ContentHeader>
                <ContentHeader>
                    <Input
                        placeholder="Looking for a game?"
                        placeholderTextColor={'#ffffff'}
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                    />
                    <Button BG={'transparent'} onPress={() => searchGame()}>
                        <SearchIcon name='search-outline' color={'#ff455f'} size={30} />
                    </Button>
                </ContentHeader>
            </Header >
            <AreaCategorys>
                <List
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={categorys}
                    renderItem={({ item }) => <CategoryList data={item} />}
                />
            </AreaCategorys>
            <ContentTrending>
                <Text style={{ color: '#ffffff', fontSize: 20 }}>Trending Games </Text>
                <List
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={games}
                    renderItem={({ item }) => <GameList data={item} />}
                    onEndReached={scrollPage}
                    onEndReachedThreshold={0.20}
                />
                {loadingGames &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"large"} color={'#FFFF'} />
                    </View>
                }
            </ContentTrending>
        </Background >
    )
}


const Background = styled.SafeAreaView`
    flex: 1;
    background-color: #050B18;
    padding: 2%;
`;

const Header = styled.View`
    height: 120px;
`;

const NameApp = styled.Text`
    font-size: 25px;
    color: ${props => props.colorText};
`;

const Input = styled.TextInput`
    background-color: #1f2430;
    flex: 1;
    border-radius: 25px;
    padding-left: 20px;
    max-height: 40px;
    color: #ffff; 
`;

const Button = styled.TouchableOpacity`
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${props => props.BG};
    height: 30px;
    width: 30px;
    justify-content: center;
    align-items:center;
    border-radius: 80px;
`;

const ContentHeader = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
`;

// ------------------------------------------ //

const AreaCategorys = styled.View`
    height: 35px;
`;

const List = styled.FlatList``; // Lista de Categorias e tambem lista de jogos

// ------------------------------------------ //

const ContentTrending = styled.View`
    padding-top: 10px;
    flex: 1;
    padding-bottom: 20px;
`;



