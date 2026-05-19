/* eslint-disable import/no-named-as-default */
import styled from 'styled-components/native';


//Container Principal
//fundo geral da tela:
export const Container = styled.View`
  flex: 1;
  background-color: #B1B1B1;
  padding: 20px;
`;

//Títulos
//formatação dos nomes (Calculadora e Historico):
export const Title = styled.Text`
  font-size: 24px;
  color: #000000;
  font-family: bash;
  margin-bottom: 20px;
`;

// Botão histórico
// Aqui você altera o estilo do botão histórico localizado na parte inferior da tela:
export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  align-self: center;

  background-color: #02BE62;
  border: 1px solid rgba(0, 0, 0, 0.4);

  padding: 10px 20px;
  border-radius: 20px;

  z-index: 1000;
`;

//Fundo do Modal (Overlay escuro)
//Fundo escuro após abrir o histórico:
export const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: #FBF9D4;
  justify-content: center;
  align-items: center;
`;

//Conteudo do Modal
//Caixa central onde será exibido o histórico(Provavelmente desnecessário alguma alteração): 
export const ModalContent = styled.View`
  width: 90%;
  max-height: 80%;

  background-color: #B1B1B1;
  border-radius: 20px;
  padding: 20px;

  border: 1px solid rgba(255,255,255,0.08);
`;

//Lista do histórico
export const HistoryScroll = styled.ScrollView`
  margin-top: 20px;
`;

//Estilização do botão(ões) (Calculadora)
//Aqui pode ser alterado o estilo do botão:
export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #FBF9D4;
  border: 2px solid rgb(0, 0, 0);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

//Texto do botão
//Pode ser alterado o estilo do texto(cor, fonte, posição, etc..):
export const ButtonText = styled.Text`
  color: #000000;
  font-size: 20px;
  font-family: bash;
`;
export const HistoryContainer = styled.View`
  margin-top: 20px;
`;

//Card do Histórico
//Aqui é a estilização do card de cada calculo salvo:
export const HistoryCard = styled.View`
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

//tipo-titulo de cada cálculo:
export const HistoryType = styled.Text`
  color: #666666;
  font-size: 12px;
`;

//Resultado (Cor destaque: Verde):
export const HistoryResult = styled.Text`
  color: #00ff88;
  font-size: 20px;
  font-family: bash;
  margin-top: 5px;
`;

// Titulo do cálculo
//Aqui você pode alterar a cor do titulo do calculo exibido no histórico:
export const Input = styled.TextInput`
  background-color: #333333;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
`;
//Layout horizontal
//O que organiza os elemntos lado a lado:
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

//Botão deletar (icone):
export const DeleteButton = styled.TouchableOpacity`
  padding: 5px;
`;

//Botão para fechar o histórico:
export const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;

  padding: 10px 20px;
  border-radius: 10px;

  background-color: #02BE62;
  border: 1px solid rgb(0, 0, 0);
`;