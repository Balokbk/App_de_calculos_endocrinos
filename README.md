# EndoCalc

Aplicativo mobile desenvolvido em React Native com foco em calculadoras endocrinológicas.

O objetivo do projeto é fornecer uma ferramenta rápida, prática e organizada para estudantes da área da saúde realizarem cálculos clínicos diretamente pelo celular ou navegador.

Feito por:\
Larissa da Silva Anastácio\
Kawan Balonecker Knupp\
Francisco Wendel Oliveira dos Santos\
Alan Soares Gomes

---

# Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- JavaScript
- Styled Components
- SQLite
---

# Estrutura do Projeto

```txt
src/
│
├── calculations/
│   ├── altura.ts
│   ├── bariatric.ts
│   ├── burch.ts
│   ├── dutch.ts
│   └── ...
│
├── database/
│   └── index.js
│
├── navigation/
│   └── index.js
│
├── pages/
│   ├── Home/
│   └── Calculator/
│
├── styles/
│
└── App.js
```

---

# Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Instalar dependências

```bash
npm install
```

ou

```bash
yarn
```

---

## 3. Iniciar o projeto

```bash
npx expo start
```

---

# Banco de Dados

O aplicativo utiliza SQLite ou o local storage(SQLite - mobile, Local Storage - Web) para armazenar:

- Histórico de cálculos
- Resultados
- Dados utilizados nos cálculos
- Títulos personalizados

---

# Sistema de Histórico

Cada cálculo realizado:

- É salvo automaticamente
- Pode ser removido
- Pode ter o título editado
- Permanece salvo localmente no dispositivo

---

# Inputs Dinâmicos

Cada calculadora possui sua própria configuração de inputs:

```ts
export const exampleConfig = {
  inputs: [
    {
      name: 'weight',
      label: 'Peso',
      type: 'number',
    }
  ]
}
```

A tela de cálculo renderiza automaticamente os campos com base nessa configuração.

---

# Sistema de Calculadoras

Cada calculadora possui:

- Configuração de inputs
- Função de cálculo
- Validação
- Resultado
- Explicação clínica

Exemplo:

```ts
export function calculateIMC(data) {
  return {
    result: '24.5',
    explanation: 'Peso adequado'
  };
}
```
