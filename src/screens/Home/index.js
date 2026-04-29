import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ScrollView, Modal, TouchableOpacity } from 'react-native';

import { calculations } from '../../calculations';
import { getAllCalculations } from '../../database';

import { ButtonText, ButtonWrapper, Container, HistoryCard, HistoryResult, HistoryType, Title } from './home.index.styles.js';

export default function Home({ navigation }) {
  const [history, setHistory] = useState([]);
  const [visible, setVisible] = useState(false);

  // Ao focar nessa tela, recarrega o historico
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const data = await getAllCalculations();
        setHistory(data || []);
      };
      loadData();
    }, [])
  );

  const openHistory = () => setVisible(true);
  const closeHistory = () => setVisible(false);

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
              {calc.label || 'Sem título'}
            </ButtonText>
          </ButtonWrapper>
        ))}
      </Container>

      {/* BOTÃO ABRIR */}
      <ButtonWrapper
        onPress={openHistory}
        style={{
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          zIndex: 1000,
        }}
      >
        <ButtonText>Ver Histórico</ButtonText>
      </ButtonWrapper>

      {/* MODAL (WEB + MOBILE) */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeHistory}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}} // Isso aqui é para não fechar o modal ao clicar dentro dele
            style={{
              width: '90%',
              maxHeight: '80%',
              backgroundColor: '#1e1e1e',
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Title>Histórico</Title>

            <ScrollView style={{ marginTop: 20 }}>
              {history.length === 0 && (
                <HistoryType>Nenhum histórico ainda</HistoryType>
              )}

              {history.map((item) => (
                <HistoryCard key={item.id}>
                  <HistoryType>{item.type}</HistoryType>
                  <HistoryResult>{item.result}</HistoryResult>
                </HistoryCard>
              ))}
            </ScrollView>

            {/* BOTÃO FECHAR */}
            <TouchableOpacity
              onPress={closeHistory}
              style={{
                marginTop: 20,
                alignSelf: 'center',
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#333',
                borderRadius: 10,
              }}
            >
              <ButtonText>Fechar</ButtonText>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}