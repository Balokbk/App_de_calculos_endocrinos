import { calculations } from '../../calculations/index.js';
import { ButtonText, ButtonWrapper, Container, Title } from './home.index.styles.js';


export default function Home({ navigation }){
    return(
        <Container>
            <Title>Calculadoras</Title>

            {Object.entries(calculations).map(([key, calc]) => (
                <ButtonWrapper
                    key={key}
                    onPress={() => (navigation.navigate('Calculator', {type: key}))}
                >
                    <ButtonText>
                        {calc.label || 'Sem titulo' }
                    </ButtonText>
                </ButtonWrapper>
            ))}
        </Container>
    );
}