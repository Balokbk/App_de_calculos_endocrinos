import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initDB } from './src/database';
import Routes from './src/navigation';


export default function App(){
    const [dbReady, setDbReady] = useState(false);
    

    useEffect(() => {
        const loadDB = async () => {
            try{
                await initDB();
                setDbReady(true);
                console.log('Database initialized successfully');
            }catch(error){
                console.error('Error initializing database:', error);
            }
        };
        
        loadDB();
    }, []);

    if(!dbReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Inicializando Banco de Dados...</Text>
            </View>
        )
    }

    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}