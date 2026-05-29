/* eslint-disable react-hooks/exhaustive-deps */
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { calculations } from '../../calculations';
import { getCalculationsByType, saveCalculation, deleteCalculation, updateCalculationTitle } from '../../database/index.js';

import { Ionicons } from '@expo/vector-icons';

import { ButtonText, ButtonWrapper, Container, Explanation, Input, Label, ResultText, Title, HistoryCard, Row, DeleteButton, HistoryType } from './calculator.index.styles.js';

export default function Calculator({ route, navigation }) {

  const { type } = route.params;

  const { fn, config } = calculations[type];

  const [form, setForm] = useState({});
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

    try {

      // valida campos
      for (const input of config.inputs) {

        const value = form[input.name];

        // campo vazio
        if (
          value === undefined ||
          value === null ||
          value === ''
        ) {

          setResult({
            result: 'Erro',
            explanation: `Preencha o campo: ${input.label}`
          });

          return;
        }

        // valor inválido
        if (
          typeof value !== 'number' ||
          Number.isNaN(value)
        ) {

          setResult({
            result: 'Erro',
            explanation: `${input.label} possui valor inválido`
          });

          return;
        }
      }

      const res = fn(form);

      setResult(res);

      saveCalculation({
        type,
        title: type,
        data: form,
        result: res.result
      });

      loadHistory();

    } catch (error) {

      setResult({
        result: 'Erro',
        explanation: error.message || 'Dados inválidos'
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [type])
  );

  return (
    <Container>

      {/* BOTÃO VOLTAR */}
      <ButtonWrapper
        onPress={() => navigation.navigate('Home')}
        style={{
          marginBottom: 20,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }}
      >
        <Ionicons name="arrow-back" size={18} color="#000" />
        <ButtonText>Voltar</ButtonText>
      </ButtonWrapper>

      <Title>{calculations[type].label}</Title>

      {config.inputs.map((input) => {

        // INPUT NUMBER
        if (input.type === 'number') {

          return (
            <Input
              key={input.name}
              placeholder={input.label}
              placeholderTextColor="#888"
              keyboardType="numeric"

              onChangeText={(value) => {

                // impede letras e símbolos inválidos
                if (
                  value !== '' &&
                  !/^[0-9.,]+$/.test(value)
                ) {
                  return;
                }

                const formatted = value.replace(',', '.');

                handleChange(
                  input.name,
                  formatted === ''
                    ? ''
                    : Number(formatted)
                );
              }}
            />
          );
        }

        // INPUT SELECT
        if (input.type === 'select') {

          return (
            <View
              key={input.name}
              style={{ marginBottom: 10 }}
            >

              <Label>{input.label}</Label>

              <Picker
                selectedValue={form[input.name]}

                onValueChange={(value) =>
                  handleChange(
                    input.name,
                    value === ''
                      ? ''
                      : Number(value)
                  )
                }
              >

                <Picker.Item
                  label="Selecione"
                  value=""
                />

                {input.options.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}

              </Picker>

            </View>
          );
        }

        return null;
      })}

      {/* BOTÃO CALCULAR */}
      <ButtonWrapper onPress={handleCalculate}>
        <ButtonText>Calcular</ButtonText>
      </ButtonWrapper>

      {/* RESULTADO */}
      {result && (
        <>
          <ResultText>
            Resultado: {result.result}
          </ResultText>

          <Explanation>
            {result.explanation}
          </Explanation>
        </>
      )}

      {/* HISTÓRICO */}
      <Title style={{ marginTop: 30 }}>
        Histórico
      </Title>

      {history.length === 0 && (
        <Label>
          Nenhum histórico ainda
        </Label>
      )}

      {history.map((item) => (

        <HistoryCard key={item.id}>

          {/* TÍTULO EDITÁVEL */}
          {editingId === item.id ? (

            <Input
              value={editingTitle}
              placeholder="Título"
              onChangeText={setEditingTitle}
              onBlur={() => saveTitle(item.id)}
              onSubmitEditing={() => saveTitle(item.id)}
              style={{
                backgroundColor: '#333333',
                color: '#ffffff'
              }}
              autoFocus
            />

          ) : (

            <HistoryType
              onPress={() => startEdit(item)}
            >
              {item.title || item.type}
            </HistoryType>

          )}

          {/* RESULTADO + DELETE */}
          <Row>

            <ResultText>
              {item.result}
            </ResultText>

            <DeleteButton
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons
                name="trash"
                size={20}
                color="#ff4d4d"
              />
            </DeleteButton>

          </Row>

        </HistoryCard>
      ))}

    </Container>
  );
}