import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  background-color: #1e1e1e;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  color: #ccc;
  margin-bottom: 5px;
`;

export const ResultText = styled.Text`
  color: #00ff88;
  font-size: 18px;
  margin-top: 20px;
`;

export const Explanation = styled.Text`
  color: #aaa;
  margin-top: 5px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #1e90ff;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;