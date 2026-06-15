import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Modal, Linking } from 'react-native';

import { calculations } from '../../calculations';
import { getAllCalculations, updateCalculationTitle, deleteCalculation } from '../../database';

import { ButtonText, ButtonWrapper, Container, HistoryCard, HistoryResult, HistoryType, Title, Input, FloatingButton, ModalOverlay, ModalContent, HistoryScroll, Row, ScrollContainer, DeleteButton, CloseButton, Footer, FooterText, FooterLink} from './home.index.styles.js';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [history, setHistory] = useState([]);
  const [visible, setVisible] = useState(false);

  // states para edição de título
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.title || item.type);
  }

  const handleDelete = async (id) => {
    await deleteCalculation(id);
    const data = await getAllCalculations();
    setHistory(data);
  };

  const saveTitle = async () => {
    if (!editingText.trim()) return;

    await updateCalculationTitle(editingId, editingText);
    const data = await getAllCalculations();
    setHistory(data);

    setEditingId(null);
  };

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
        
        <ScrollContainer showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
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
        </ScrollContainer>
        <Footer>
          <FooterText>Desenvolvido por </FooterText>
          <FooterLink onPress={() => Linking.openURL('https://www.linkedin.com/in/kawan-b-k/')}>
            Kawan Balonecker Knupp
          </FooterLink>
          <FooterText>, </FooterText>
          <FooterText>Alan Soares Gomes</FooterText>
          <FooterText>, </FooterText>
          <FooterText>Larissa da Silva Anastácio</FooterText>
          <FooterText>, </FooterText>
          <FooterText>Francisco Wendel Oliveira dos Santos</FooterText>
          <FooterText> • </FooterText>
          <FooterLink onPress={() => Linking.openURL('https://github.com/Balokbk/App_de_calculos_endocrinos')}>
            Github
          </FooterLink>

        </Footer>
      </Container>

      {/* Botão float */}
      <FloatingButton onPress={openHistory}>
        <ButtonText>Ver Histórico</ButtonText>
      </FloatingButton>

      {/* Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <ModalOverlay onPress={closeHistory} activeOpacity={1}>
          
          <ModalContent onStartShouldSetResponder={() => true}>
            <Title>Histórico</Title>

            <HistoryScroll>
              {history.length === 0 && (
                <HistoryType>Nenhum histórico ainda</HistoryType>
              )}

              {history.map((item) => (
                <HistoryCard key={item.id}>
                  
                  {editingId === item.id ? (
                    <Input
                      value={editingText}
                      placeholder="Título"
                      onChangeText={setEditingText}
                      onBlur={saveTitle}
                      onSubmitEditing={saveTitle}
                      autoFocus
                    />
                  ) : (
                    <HistoryType onPress={() => startEditing(item)}>
                      {item.title ? item.title : item.type}
                    </HistoryType>
                  )}
                  
                  <Row>
                    <HistoryResult>{item.result}</HistoryResult>

                    <DeleteButton
                      onPress={() => handleDelete(item.id)}
                      activeOpacity={0.6}
                    >
                      <Ionicons name="trash" size={20} color="#ff4d4d" />
                    </DeleteButton>
                  </Row>

                </HistoryCard>
              ))}
            </HistoryScroll>

            <CloseButton onPress={closeHistory}>
              <ButtonText>Fechar</ButtonText>
            </CloseButton>
          </ModalContent>

        </ModalOverlay>
      </Modal>
    </>
  );
}