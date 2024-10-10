import React from "react";
import { Image, Text } from "react-native";
import styled from "styled-components/native";
import Star from "react-native-vector-icons/Ionicons"
export default function GameList({ data }) {

    return (
        <Container>
            <Image
                style={{ width: '100%', height: 200, resizeMode: 'cover' }}
                source={{ uri: data.background_image }}
            />
            <Content>
                <Label> {data.name}</Label>
                <AreaRatig>
                    <Star name='star-half-outline' size={22} color={'#FA1E'} />
                    <Label> {data.rating} </Label>
                </AreaRatig>
            </Content>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    border-radius: 8px;
    background-color: #fff;
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