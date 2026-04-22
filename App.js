import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { initDB } from './src/database';
import Routes from './src/navigation';

export default function App(){

    useEffect(() => {
        initDB();
        console.log('Database initialized');
    }, []);

    return(
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    );
}