import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Platform, View } from 'react-native';
import { calculations } from '../../calculations/index.js';
import { getAllCalculations } from '../../database/index.js';
import { ButtonText, ButtonWrapper, Container, HistoryCard, HistoryContainer, HistoryResult, HistoryType, Title } from './home.index.styles.js';


  const BottomSheet = Platform.OS !== 'web'
  ? require('@gorhom/bottom-sheet').default
  : null;

  export default function Home({ navigation }){
    console.log('HOME RENDERIZOU');
    const [history, setHistory] = useState([]);

    useFocusEffect(
      useCallback(() => {
        const loadData = async () => {
        const data = await getAllCalculations();
        console.log('HISTORICO', data)
        setHistory(data || []);
        };

        loadData();

        if (Platform.OS === 'web') {
          openSheet();
        } else {
        setTimeout(() => {
          bottomSheetRef.current?.expand()
        }, 150);
        }
      }, [])
    )

    // Botão Sheet (mobile)
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['30s%', '50%', '85%'], []);

    // Animação (web)
  const screenHeight = Dimensions.get('window').height;
  const SNAP_TOP = 0;
  const SNAP_MIDDLE = screenHeight * 0.15;
  const SNAP_BOTTOM = screenHeight * 0.969;

  const translateY = useRef(new Animated.Value(SNAP_BOTTOM)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        let newPosition = SNAP_MIDDLE + gesture.dy;
        if (newPosition < SNAP_TOP) newPosition = SNAP_TOP;
        if (newPosition > SNAP_BOTTOM) newPosition = SNAP_BOTTOM;

        translateY.setValue(newPosition);
    },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 150) {
            Animated.timing(translateY, {
                toValue: SNAP_BOTTOM,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: SNAP_MIDDLE,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
      },
    })
  ).current;

  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: SNAP_MIDDLE,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

    return (
    <>
      <Container>
        <Title>Calculadoras</Title>

        {Object.entries(calculations).map(([key, calc]) => (
          <ButtonWrapper
            key={key}
            onPress={() =>
              navigation.navigate('Calculator', { type: key })
            }
          >
            <ButtonText>
              {calc.label || 'Sem titulo'}
            </ButtonText>
          </ButtonWrapper>
        ))}
      </Container>

      {Platform.OS === 'web' ? (
        // Animação da web
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: screenHeight,
            backgroundColor: '#1e1e1e',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [{ translateY }],
            zIndex: 999,
            elevation: 10,
          }}
        >
            {/*Barra de arrastar */}
          <View
            {...panResponder.panHandlers} 
          style={{
            alignItems: 'center', 
            padding: 10,
            userSelect: 'none',
            cursor: 'grab' 
            }}
          >
            <View
              style={{
                width: 40,
                height: 5,
                backgroundColor: '#888',
                borderRadius: 5,
                marginBottom: 10,
              }}
            />
          </View>

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
        </Animated.View>
      ) : (
        // Botão sheet mobile
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
      )}
    </>
  );
} 