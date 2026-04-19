import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Calculator from '../screens/Calculator';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Calculator" component={Calculator} />
        </Stack.Navigator>
    );
}