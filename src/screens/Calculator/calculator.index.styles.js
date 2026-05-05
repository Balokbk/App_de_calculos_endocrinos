import styled from 'styled-components/native';

//Container Principal
//Scroll da tela inteira (permite rolar quando tiver bastante conteúdo):
export const Container = styled.ScrollView`
  flex: 1;
  background-color: #1e1e1e;
  padding: 20px;
`;

// Titulo do Tipode calculo:
export const Title = styled.Text`
  color: #888;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

//Onde será inserido os valores:
export const Input = styled.TextInput`
  background-color: #2a2a2a;
  color: white;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(255,255,255,0.1);
`;

//texto que descreve o ipunt ex:("Altura", "Peso"):
export const Label = styled.Text`
  color: #888;
  margin-bottom: 5px;
`;

//Resultado
//Valor final da conta(Cord padrão verde):
export const ResultText = styled.Text`
  color: #00ff88;
  font-size: 18px;
  font-weight: bold;
`;

//texto onde será explicado o resultado:
export const Explanation = styled.Text`
  color: #aaa;
  margin-top: 5px;
`;

//Botão calcular:
export const ButtonWrapper = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.05);
  border: 1px solid rgba(150,150,150,0.4);
  padding: 12px;
  border-radius: 12px;
  margin-top: 10px;
  align-items: center;
`;

//Texto do botão
export const ButtonText = styled.Text`
  color: #ccc;
  font-weight: bold;
`;

//Card do Histórico
//Aqui é a estilização do card de cada calculo salvo:
export const HistoryCard = styled.View`
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid rgba(255,255,255,0.08);
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