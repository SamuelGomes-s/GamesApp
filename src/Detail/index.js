import React, { useState } from "react";
import styled from "styled-components/native";
import { Image, Modal, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Star from "react-native-vector-icons/Ionicons";
import BackIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
let textLorem = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.';


export default function Detail() {
    const route = useRoute()
    const { data } = route?.params
    const navigation = useNavigation()
    let gameData = data
    const [imagesGame, setImagesGame] = useState(data.short_screenshots)
    const [genresGame, setGenresGame] = useState(data.genres)
    const [platforms, setPlatforms] = useState(data.platforms)
    const [modalVisible, setModalVisible] = useState(false)
    const [stores, setStores] = useState(data.stores)
    function goBack() {
        return navigation.goBack()
    }

    async function handleFavoritesGames(newGame) {
        try {
            const storageLocal = await AsyncStorage.getItem('@games') // Recuperando games salvos se existir
            let favoritesGames = storageLocal ? JSON.parse(storageLocal) : []
            let gameExists = false
            if (favoritesGames.length != 0) {
                favoritesGames.map(game => {
                    if (game.id === newGame.id) { // Verificando se o jogo existe
                        gameExists = true
                    }
                })

            }
            if (!gameExists) {
                favoritesGames.push(newGame) //Adicionando novo jogo
                await AsyncStorage.setItem('@games', JSON.stringify(favoritesGames)) // salvando
                console.log('O jogo n existe, portanto foi salvo')
                return
            }
            console.log('O jogo existe, portanto não foi salvo')

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Background>
            <ScrollView showsVerticalScrollIndicator={false}  >
                <View   style={{
                    position: "absolute",
                    top: 20,
                    left: 10,
                    zIndex: 99,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: '100%',
                    paddingHorizontal: 20,
                    marginTop: 15
                }}>
                    <ButtonActions onPress={() => goBack()}>
                        <BackIcon name='arrow-back-outline' color={"#ffffff"} size={25} />
                    </ButtonActions>
                    <ButtonActions onPress={() => handleFavoritesGames(gameData)}>
                        <BackIcon name='bookmark-outline' color={"#ffffff"} size={25} />
                    </ButtonActions>
                </View>
                <AreaList style={{ height: 200, maxHeight: 200, backgroundColor: '#64748b' }}>
                    <List
                        keyExtractor={item => item.id}
                        horizontal={true}
                        renderItem={({ item }) => ListImages(item)}
                        data={imagesGame}
                    />
                </AreaList>
                <AreaRatig>
                    <Star name='star-half-outline' size={22} color={'#FA1E'} />
                    <Label> {data.rating} </Label>
                </AreaRatig>
                <Label style={{ fontSize: 20 }}> {data.name}</Label>

                <AreaList style={{ maxHeight: 85 }}>
                    <Label style={{ fontSize: 20, marginTop: 10 }}>Genres</Label>
                    <List
                        keyExtractor={item => item.id}
                        horizontal={true}
                        renderItem={({ item }) => ListGenres(item)}
                        data={genresGame}
                    />
                </AreaList>

                <AreaDescription>
                    <Label> Description</Label>
                    <Description numberOfLines={7} ellipsizeMode="tail">
                        {textLorem}
                    </Description>
                    <ButtonModal onPress={() => setModalVisible(true)}>
                        <Label>Read full description</Label>
                    </ButtonModal>
                </AreaDescription>

                <AreaList style={{}}>
                    <Label style={{ fontSize: 20, marginTop: 10 }}>Platforms</Label>
                    <List
                        keyExtractor={item => item.platform.id}
                        horizontal={true}
                        renderItem={({ item }) => ListPlatforms(item)}
                        data={platforms}
                    />
                </AreaList>

                <AreaList style={{}}>
                    <Label style={{ fontSize: 20, marginTop: 10 }}>Stores</Label>
                    <List
                        keyExtractor={item => item.store.id}
                        horizontal={true}
                        renderItem={({ item }) => ListStores(item)}
                        data={stores}
                    />
                </AreaList>
            </ScrollView>
            <Modal visible={modalVisible}>
                <Background style={{ backgroundColor: '#0F172A', justifyContent: "center", alignItems: "center", paddingTop: 25 }}>
                    <View style={{ position: "absolute", top: 20, left: 10 }}>
                        <ButtonActions onPress={() => setModalVisible(false)}>
                            <BackIcon name='arrow-back-outline' color={"#ffffff"} size={25} />
                        </ButtonActions>
                    </View>
                    <Label style={{ fontSize: 20, marginBottom: 15 }}> Description</Label>
                    <AreaDescription style={{ flex: 1 }}>
                        <Description>
                            {textLorem}
                        </Description>
                    </AreaDescription>
                </Background>
            </Modal>
        </Background>
    )
}


const ListImages = ((item) => {
    return (
        <View key={item.id.toString()} style={{ height: 200 }}>
            <Image
                style={{ width: 400, height: 200 }}
                source={{ uri: item.image }}
            />
        </View>
    )
})
const ListGenres = ((item) => {

    return (
        <View key={item.id.toString()}>
            <Container BG={'#64748b'} style={{ marginBottom: 10 }}>
                <Content>
                    <Label> {item.name}</Label>
                </Content>
            </Container>
        </View>
    )
})

const ListPlatforms = ((item) => {

    return (
        <View key={item.platform.id.toString()} >
            <Container BG={'#0f172a'}>
                <Content>
                    <Label style={{ textAlign: "center" }}> {item.platform.name}</Label>
                </Content>
            </Container>
        </View>
    )
})
const ListStores = ((item) => {
    return (
        <View key={item.store.id.toString()} style={{ justifyContent: "center" }}>
            <Container BG={'#0f172a'}>
                <Content>
                    <Label> {item.store.name}</Label>
                </Content>
            </Container>
        </View>
    )
})



const Background = styled.SafeAreaView`
    flex: 1;
    background-color: #050B18;
    padding: 2%;
`;

const List = styled.FlatList``; // Lista de Categorias e tambem lista de jogos

const AreaList = styled.View`
`;

const AreaRatig = styled.View`
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
`;


const Label = styled.Text`
    font-weight: 700;
    color: #ffffff;
`;

const Container = styled.View`
    justify-content: center;
    align-items: center;
    margin-right:  10px;
    border-radius: 8px;
    background-color: ${props => props.BG};
    width: 85px;
    margin-top:5px;
`;

const Content = styled.View`
    padding: 1px;
    justify-content: center;
    align-items: center;
`;
const AreaDescription = styled.View`
    height: 200px;
    width:100%;
`;

const Description = styled.Text`
    margin-top: 5px;
    color: #EFEFEFB2;
`;

const ButtonModal = styled.TouchableOpacity`
    margin-top: 10px;
    height: 30px;
    width: 100%;
    border-radius: 8px;
    background-color: #0E5C88;
    justify-content:  center;
    align-items: center;
`;

const ButtonActions = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #050B18;
    justify-content: center;
    align-items: center; 
`;



