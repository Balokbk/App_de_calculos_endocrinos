import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initDB } from './src/database';
import Routes from './src/navigation';

export default function App(){

    useEffect(() => {
        initDB();
        console.log('Database initialized');
    }, []);

    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}