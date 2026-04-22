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