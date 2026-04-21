import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { calculations } from '../../calculations';

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
        <View>
            <Text>{type}</Text>

            {config.inputs.map((input) => {
                if(input.type === 'number') {
                    return(
                        <TextInput
                            key={input.name}
                            placeholder={input.label}
                            keyboardType={'numeric'}
                            onChangeText={(value) => handleChange(input.name, Number(value))}    
                        />
                    );
                }

                if(input.type === 'select') {
                    return(
                        <View key={input.name}>
                            <Text>{input.label}</Text>
                            <Picker
                                selectedValue={form[input.name]}
                                onValueChange={(itemValue) => handleChange(input.name, Number(itemValue))}
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

            <Button title='Calcular' onPress={handleCalculate} />

            {result && (
                <>
                    <Text>Resultado: {result.result}</Text>
                    <Text>{result.explanation}</Text>
                </>
            )}
        </View>
    );
}