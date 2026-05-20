import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import { initDB } from './src/database';
import Routes from './src/navigation';

export default function App() {
    const [dbReady, setDbReady] = useState(false);

    const [fontsLoaded] = useFonts({
        Ubuntu: require('./src/assets/fonts/Ubuntu-Regular.ttf'),
        UbuntuBold: require('./src/assets/fonts/Ubuntu-Bold.ttf')
    });

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

    // carregando fontes
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    // carregando banco
    if(!dbReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Ubuntu' }}>
                    Inicializando Banco de Dados...
                </Text>
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