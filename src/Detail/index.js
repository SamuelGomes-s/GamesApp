import React, { useState } from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Star from "react-native-vector-icons/Ionicons"
let textLorem = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.';


export default function Detail() {
    const route = useRoute()
    const { data } = route?.params

    const [imagesGame, setImagesGame] = useState(data.short_screenshots)
    const [genresGame, setGenresGame] = useState(data.genres)
    const [platforms, setPlatforms] = useState(data.platforms)
    const [stores, setStores] = useState(data.stores)


    return (
        <Background>
            <AreaList style={{ maxHeight: 200 }}>
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
                <Description numberOfLines={7}  ellipsizeMode="tail">
                    {textLorem}
                </Description>
                <ButtonModal>
                    <Label>Read full description</Label>
                </ButtonModal>
            </AreaDescription>

            <AreaList style={{}}>
                <Label style={{ fontSize: 20, marginTop: 10 }}>Platforms</Label>
                <List
                    keyExtractor={item => item.id}
                    horizontal={true}
                    renderItem={({ item }) => ListPlatforms(item)}
                    data={platforms}
                />
            </AreaList>

            <AreaList style={{}}>
                <Label style={{ fontSize: 20, marginTop: 10 }}>Stores</Label>
                <List
                    keyExtractor={item => item.id}
                    horizontal={true}
                    renderItem={({ item }) => ListStores(item)}
                    data={stores}
                />
            </AreaList>
        </Background>
    )
}


const ListImages = ((item) => {
    return (
        <View style={{ height: 200 }}>
            <Image
                style={{ width: 400, height: 200 }}
                source={{ uri: item.image }}
            />
        </View>
    )
})
const ListGenres = ((item) => {
    return (
        <View>
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
        <View >
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
        <View style={{ justifyContent: "center" }}>
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
// const Label = styled.Text`
//     margin-top: 20px;
//     text-align: center;
//     color: #ffff;
// `;
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
    color: #1F2430;
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




