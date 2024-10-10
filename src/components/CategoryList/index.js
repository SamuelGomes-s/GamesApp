import { useNavigation } from "@react-navigation/native";
import React from "react";

import styled from "styled-components/native";

export default function CategoryList({ data }) {

    const navigation = useNavigation()

    function goCategory(idCategory) {

        navigation.navigate('Category', {
            idCategory
        })
    }
    return (
        <Container onPress={() => goCategory(data.id)}>
            <Content>
                <Label> {data.name}</Label>
            </Content>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    border-radius: 8px;
    background-color: #64748b;
    width: 85px;

`;

const Content = styled.View`
    justify-content: center;
    align-items: center;
`;

const Label = styled.Text`
    color: #ffffff;
    font-weight: 700;
`;