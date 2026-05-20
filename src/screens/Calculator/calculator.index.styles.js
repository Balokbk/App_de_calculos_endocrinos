// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components/native';

//Container Principal
//Scroll da tela inteira (permite rolar quando tiver bastante conteúdo):
export const Container = styled.ScrollView`
  flex: 1;
  background-color: #232925;
  padding: 20px;
`;

// Titulo do Tipo de calculo:
export const Title = styled.Text`
  color: #F2F5F3;
  font-size: 22px;
  font-family: 'Ubuntu';
  margin-bottom: 20px;
`;

//Onde será inserido os valores:
export const Input = styled.TextInput`
  font-family: 'Ubuntu';
  background-color: #101411;
  color: #F2F5F3;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

//texto que descreve o ipunt ex:("Altura", "Peso"):
export const Label = styled.Text`
  color: #F2F5F3;
  margin-bottom: 5px;
`;

//Resultado
//Valor final da conta(Cord padrão verde):
export const ResultText = styled.Text`
  color: #00ff88;
  font-size: 20px;
  font-family: 'Ubuntu';
`;

//texto onde será explicado o resultado:
export const Explanation = styled.Text`
  color: #000000;
  margin-top: 5px;
`;

//Botão calcular:
export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #02BE62;
  padding: 12px;
  border-radius: 12px;
  margin-top: 10px;
  align-items: center;
`;

//Texto do botão
export const ButtonText = styled.Text`
  color: #000000;
  font-family: 'Ubuntu';
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

//Layout horizontal
//O que organiza os elemntos lado a lado:
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

//Botão deletar (icone):
export const DeleteButton = styled.TouchableOpacity`
  padding: 5px;
`;