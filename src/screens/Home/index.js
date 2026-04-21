import { View, Text, Button } from 'react-native';
import { calculations } from '../../calculations/index.js';

export default function Home({ navigation }){
    return(
        <View>
            <Text>Calculadoras</Text>

            {Object.entries(calculations).map(([key, calc]) => (
                <Button
                    key={key}
                    title={calc.label || 'Sem título'}
                    onPress={() => (navigation.navigate('Calculator', {type: key}))}
                 />
            ))}
        </View>
    );
}