import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import BackIcon from "react-native-vector-icons/Ionicons";

export default function Header({ title }) {

    const navigation = useNavigation()

    function goBack() {
        return navigation.goBack()
    }

    return (
        <Background>

            <ButtonIcon onPress={()=> goBack()}>
                <BackIcon name='arrow-back-outline' size={30} color={'#FFFFFf'} />
            </ButtonIcon>
            <Title> {title ? title : 'Component'}</Title>
        </Background>
    )
}

const Background = styled.SafeAreaView`
    background-color: #050B18;
    max-height:  90px;
    padding: 2%;
    flex-direction: row;
`;

const ButtonIcon = styled.TouchableOpacity``;

const Title = styled.Text`
    font-size: 22px;
    color: #ffffff;
`;
