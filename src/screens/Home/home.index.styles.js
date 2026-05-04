/* eslint-disable import/no-named-as-default */
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #1e1e1e;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #888888;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  align-self: center;

  background-color: rgba(255,255,255,0.05);
  border: 1px solid rgba(150,150,150,0.4);

  padding: 10px 20px;
  border-radius: 20px;

  z-index: 1000;
  elevation: 10;
`;

export const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  width: 90%;
  max-height: 80%;

  background-color: #1e1e1e;
  border-radius: 20px;
  padding: 20px;

  border: 1px solid rgba(255,255,255,0.08);
`;

export const HistoryScroll = styled.ScrollView`
  margin-top: 20px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #666666;
  font-size: 16px;
  font-weight: bold;
`;
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
  color: #666666;
  font-size: 12px;
`;

export const HistoryResult = styled.Text`
  color: #00ff88;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

export const Input = styled.TextInput`
  background-color: #333333;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;

  padding: 10px 20px;
  border-radius: 10px;

  background-color: rgba(255,255,255,0.08);
  border: 1px solid rgba(150,150,150,0.3);
`;