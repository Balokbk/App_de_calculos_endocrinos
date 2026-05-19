import styled from 'styled-components/native';

//Container Principal
//Scroll da tela inteira (permite rolar quando tiver bastante conteúdo):
export const Container = styled.ScrollView`
  flex: 1;
  background-color: #B1B1B1;
  padding: 20px;
`;

// Titulo do Tipode calculo:
export const Title = styled.Text`
  color: #000000;
  font-size: 22px;
  font-family: bash;
  margin-bottom: 20px;
`;

//Onde será inserido os valores:
export const Input = styled.TextInput`
  background-color: #FBF9D4;
  color: white;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 2px solid rgb(0, 0, 0);
`;

//texto que descreve o ipunt ex:("Altura", "Peso"):
export const Label = styled.Text`
  color: #000000;
  margin-bottom: 5px;
`;

//Resultado
//Valor final da conta(Cord padrão verde):
export const ResultText = styled.Text`
  color: #00ff88;
  font-size: 20px;
  font-family: bash;
`;

//texto onde será explicado o resultado:
export const Explanation = styled.Text`
  color: #000000;
  margin-top: 5px;
`;

//Botão calcular:
export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #02BE62;
  border: 1px solid rgb(0, 0, 0);
  padding: 12px;
  border-radius: 12px;
  margin-top: 10px;
  align-items: center;
`;

//Texto do botão
export const ButtonText = styled.Text`
  color: #000000;
  font-family: bash;
`;

//Card do Histórico
//Aqui é a estilização do card de cada calculo salvo:
export const HistoryCard = styled.View`
  background-color: #000000;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid rgb(0, 0, 0);
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