import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View } from 'react-native';
import { calculations } from '../../calculations';
import { ButtonText, ButtonWrapper, Container, Explanation, Input, Label, ResultText, Title } from './calculator.index.styles.js';

export default function Calculator({ route }){
    const { type } = route.params;
    
    const { fn, config } = calculations[type];

    const [form, setForm] = useState({
        gender: ''
    });
    const [result, setResult] = useState(null);

    const handleChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));    
    };

    const handleCalculate = () => {
        if(!form.gender || !form.father || !form.mother) {
            return;
        }
        const res = fn(form);
        setResult(res);
    }

    return(
        <Container>
            <Title>{type}</Title>

            {config.inputs.map((input) => {
                if(input.type === 'number') {
                    return(
                        <Input
                            key={input.name}
                            placeholder={input.label}
                            placeholderTextColor= "#888"
                            keyboardType={'numeric'}
                            onChangeText={(value) => handleChange(input.name, value === ''?'':Number(value))}    
                        />
                    );
                }

                if(input.type === 'select') {
                    return(
                        <View key={input.name}>
                            <Label>{input.label}</Label>
                            <Picker
                                selectedValue={form[input.name]}
                                onValueChange={(itemValue) => handleChange(input.name, itemValue=== ''?'' : Number(itemValue))}
                            >
                                <Picker.Item label='Selecione' value=''/>
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
        </Container>
    );
}