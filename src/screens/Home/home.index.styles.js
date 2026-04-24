import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #1e90ff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
// Estilo da função botão sheet vvv

export const HistoryContainer = styled.View`
  margin-top: 20px;
`;

export const HistoryCard = styled.View`
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const HistoryType = styled.Text`
  color: #aaa;
  font-size: 12px;
`;

export const HistoryResult = styled.Text`
  color: #00ff88;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;