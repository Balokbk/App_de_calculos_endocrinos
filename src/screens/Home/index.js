import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { calculations } from '../../calculations/index.js';
import { getAllCalculations } from '../../database';
import { ButtonText, ButtonWrapper, Container, HistoryCard, HistoryContainer, HistoryResult, HistoryType, Title } from './home.index.styles.js';

export default function Home({ navigation }){
    const [history, setHistory] = useState([]);

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['10%', '50%', '85%'], []);

    useFocusEffect(
        useCallback(() => {
            const data = getAllCalculations();
            setHistory(data);
        }, [])
    );
    return(
    <>
        <Container>
        <Title>Calculadoras</Title>

        {Object.entries(calculations).map(([key, calc]) => (
            <ButtonWrapper
            key={key}
            onPress={() => navigation.navigate('Calculator', { type: key })}
            >
            <ButtonText>
                {calc.label || 'Sem titulo'}
            </ButtonText>
            </ButtonWrapper>
        ))}
        </Container>

        <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#1e1e1e' }}
        handleIndicatorStyle={{ backgroundColor: '#888' }}
         >
        <View style={{ padding: 20 }}>
            <Title>Histórico</Title>

            <HistoryContainer>
                {history.length === 0 && (
                    <HistoryType>Nenhum histórico ainda</HistoryType>
                )}

            {history.map((item) => (
                <HistoryCard key={item.id}>
                    <HistoryType>{item.type}</HistoryType>
                    <HistoryResult>{item.result}</HistoryResult>
                </HistoryCard>
            ))}
            </HistoryContainer>
        </View>
        </BottomSheet>
    </>
    );
}