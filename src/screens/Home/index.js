import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { calculations } from '../../calculations/index.js';
import { getAllCalculations } from '../../database';
import { ButtonText, ButtonWrapper, Container, Title } from './home.index.styles.js';

export default function Home({ navigation }){
    const [history, setHistory] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const data = getAllCalculations();
            setHistory(data);
        }, [])
    );
    
    return(

        <Container>
            <Title>Calculadoras</Title>

            {Object.entries(calculations).map(([key, calc]) => (
                <ButtonWrapper
                    key={key}
                    onPress={() => (navigation.navigate('Calculator', {type: key}))}
                >
                    <ButtonText>
                        {calc.label || 'Sem titulo' }
                    </ButtonText>
                </ButtonWrapper>
            ))}

            <Title>Histórico</Title>

            {history.map((item) => (
                <View key={item.id}>
                    <ButtonText>
                        {item.type}
                        {item.result}
                    </ButtonText>
                </View>
            ))}
        </Container>
    );
}