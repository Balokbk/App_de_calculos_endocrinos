/* eslint-disable react-hooks/exhaustive-deps */
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { calculations } from '../../calculations';
import { getCalculationsByType, saveCalculation, deleteCalculation, updateCalculationTitle } from '../../database/index.js';
import { Ionicons } from '@expo/vector-icons';

import { ButtonText, ButtonWrapper, Container, Explanation, Input, Label, ResultText, Title } from './calculator.index.styles.js';

export default function Calculator({ route }) {
  const { type } = route.params;

  const { fn, config } = calculations[type];

  const [form, setForm] = useState({
    gender: ''
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // edição de título
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const loadHistory = () => {
    const data = getCalculationsByType(type);
    setHistory(data || []);
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    deleteCalculation(id);
    loadHistory();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingTitle(item.title || '');
  };

  const saveTitle = (id) => {
    if (!editingTitle.trim()) {
      setEditingId(null);
      setEditingTitle('');
      return;
    }

    updateCalculationTitle(id, editingTitle);
    setEditingId(null);
    setEditingTitle('');
    loadHistory();
  };

  const handleCalculate = () => {
    if (!form.gender || !form.father || !form.mother) return;

    const res = fn(form);
    setResult(res);

    saveCalculation({
      type,
      title: type,
      data: form,
      result: res.result
    });

    loadHistory();
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [type])
  );

  return (
    <Container>
      <Title>{type}</Title>

      {config.inputs.map((input) => {
        if (input.type === 'number') {
          return (
            <Input
              key={input.name}
              placeholder={input.label}
              placeholderTextColor="#888"
              keyboardType="numeric"
              onChangeText={(value) =>
                handleChange(input.name, value === '' ? '' : Number(value))
              }
            />
          );
        }

        if (input.type === 'select') {
          return (
            <View key={input.name}>
              <Label>{input.label}</Label>
              <Picker
                selectedValue={form[input.name]}
                onValueChange={(itemValue) =>
                  handleChange(input.name, itemValue === '' ? '' : Number(itemValue))
                }
              >
                <Picker.Item label="Selecione" value="" />
                {input.options.map((opt) => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          );
        }
      })}

      <ButtonWrapper onPress={handleCalculate}>
        <ButtonText>Calcular</ButtonText>
      </ButtonWrapper>

      {result && (
        <>
          <ResultText>Resultado: {result.result}</ResultText>
          <Explanation>{result.explanation}</Explanation>
        </>
      )}

      <Title>Histórico</Title>

      {history.map((item) => (
        <View key={item.id} style={{ marginBottom: 15 }}>

          {editingId === item.id ? (
            <Input
              value={editingTitle}
              placeholder="Título"
              onChangeText={setEditingTitle}
              onBlur={() => saveTitle(item.id)}
              onSubmitEditing={() => saveTitle(item.id)}
              autoFocus
              style={{ color: '#fff' }}
            />
          ) : (
            <ButtonText onPress={() => startEdit(item)}>
              {item.title || item.type}
            </ButtonText>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ResultText>{item.result}</ResultText>

            <ButtonWrapper
              onPress={() => handleDelete(item.id)}
              style={{
                padding: 5,
                backgroundColor: 'transparent',
                elevation: 0
              }}
            >
              <Ionicons name="trash" size={20} color="#ff4444" />
            </ButtonWrapper>
          </View>

        </View>
      ))}
    </Container>
  );
}