import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, View, Modal, TouchableOpacity, Platform } from 'react-native';
import { calculations } from '../../calculations/index.js';
import { getAllCalculations } from '../../database/index.js';
import { ButtonText, ButtonWrapper, Container, HistoryCard, HistoryContainer, HistoryResult, HistoryType, Title } from './home.index.styles.js';



  export default function Home({ navigation }){
    const [history, setHistory] = useState([]);
    const [visible, setVisible] = useState(false);

    const screenHeight = Dimensions.get('window').height;
    const SNAP_TOP = 0;
    const SNAP_MIDDLE = screenHeight * 0.15;
    const SNAP_BOTTOM = screenHeight * 0.969;
    //Animação Web
    const translateY = useRef(new Animated.Value(SNAP_BOTTOM)).current;

    const openSheet = useCallback(() => {
        Animated.timing(translateY, {
          toValue: SNAP_MIDDLE,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        let newPosition = gesture.moveY;
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

    //Modal Mobile

  const modalTranslateY = useRef(new Animated.Value(300)).current;
  const openModal = () => {
    setVisible(true);
    Animated.timing(modalTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
    
  const closeModal = () => {
    Animated.timing(modalTranslateY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  useFocusEffect(
      useCallback(() => {
        const loadData = async () => {
          const data = await getAllCalculations();
          setHistory(data || []);
        };

        loadData();
        
        if (Platform.OS === 'web') {
          openSheet();
        }
      }, [openSheet])
    );

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

      {Platform.OS !== 'web' && (
            <ButtonWrapper onPress={openModal}
              style={{
                position: 'absolute',
                bottom: 30,
                alignSelf: 'center',
                elevation: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                zIndex: 1000,
              }}
            >
            <ButtonText>Ver Histórico</ButtonText>
          </ButtonWrapper>
        )}
  

      {Platform.OS === 'web' && (
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
        {/* Barra de arrastar */}
        <View
         {...panResponder.panHandlers}
          style={{
            alignItems: 'center',
            padding: 10,
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
    
    )}


      {/*/ Mobile (Modal) */}
      {Platform.OS !== 'web' && (
        <Modal transparent visible={visible} animationType="none">
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'flex-end',
            }}
            activeOpacity={1}
            onPress={closeModal}
          >
            <Animated.View
              style={{
                backgroundColor: '#1e1e1e',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
                transform: [{ translateY: modalTranslateY }],
              }}
            >
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
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
} 