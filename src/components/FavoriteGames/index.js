import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import Star from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native";
import TrashIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesGames({ data, gameLocal }) {

    const navigation = useNavigation()
    let urlImage = !data.background_image ? "https:" : data.background_image

    function details() {
        return navigation.navigate('Detail', { data })
    }

    async function favoriteDelete(id) {
        try {
            const storageLocal = await AsyncStorage.getItem('@games')
            let favorites = JSON.parse(storageLocal)
            favorites = favorites.filter(game => game.id !== id)
            await AsyncStorage.setItem('@games', JSON.stringify(favorites)) // Atualiza o storage local
            gameLocal(favorites) //atualiza o useState que controla a lista de jogos locais. 
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container onPress={() => details()}>
            <Image
                style={{ width: '100%', height: 200, resizeMode: 'cover' }}
                source={{ uri: urlImage }}
            />
            <Content>
                <Label> {data.name}</Label>
                <AreaRatig>
                    <Star name='star-half-outline' size={22} color={'#FA1E'} />
                    <Label> {data.rating} </Label>
                </AreaRatig>
            </Content>
            <DeleteButton onPress={() => favoriteDelete(data.id)}>
                <ContentButton>
                    <TrashIcon name='trash-outline' color={'#ffffff'} size={30} />
                </ContentButton>
            </DeleteButton>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    border-radius: 8px;
    background-color: #121212; /* Para aqueles casos em que não possuir background e o nome do ficar legivel.*/ 
    margin-top: 15px;
    max-height: 300px;
`;

const Content = styled.View`
    position: absolute;
    bottom: 5px;
    left: 10px;
    z-index: 99;
`;

const AreaRatig = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Label = styled.Text`
    font-weight: 700;
    color: #ffffff;
`;

const ContentButton = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 99;
    background-color: #e72f49;
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;