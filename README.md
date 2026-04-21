# Calculadora Endócrina (Mobile)

## Visão Geral

Aplicação mobile desenvolvida com React Native (Expo) com foco em cálculos utilizados na área de endocrinologia.

O app funciona 100% offline e utiliza SQLite como armazenamento local.

O diferencial da aplicação é a estrutura dinâmica de cálculos, onde cada cálculo define seus próprios inputs e comportamento, permitindo fácil expansão sem alterar a interface principal.

## Lembrando

Ao baixar o projeto pela primeira vez, lembre se de dar um `npm i` e rodar o projeto de forma local para desenvolvimento com o `npx expo start`

---

## Tecnologias Utilizadas

* React Native (Expo)
* JavaScript (UI)
* TypeScript (lógica de cálculo)
* SQLite (armazenamento local)
* React Navigation
* Styled Components (UI)

---

## Estrutura do Projeto

```
/src
 ├── screens          → telas do app (Home, Calculator)
 ├── components       → componentes reutilizáveis
 ├── calculations     → lógica dos cálculos + configuração dinâmica
 ├── database         → integração com SQLite
 ├── navigation       → rotas do app
 └── constants        → constantes globais
```

---

## Arquitetura de Cálculos

Cada cálculo é dividido em duas partes:

### 1. Função de cálculo

Responsável apenas pela lógica.

```ts
export function calculateAltura(input) {
  return {
    result: "...",
    explanation: "..."
  };
}
```

---

### 2. Configuração do formulário

Define como a UI será montada dinamicamente.

```ts
export const alturaConfig = {
  inputs: [
    {
      name: 'gender',
      label: 'Sexo',
      type: 'select',
      options: [
        { label: 'Masculino', value: 1 },
        { label: 'Feminino', value: 2 }
      ]
    },
    {
      name: 'father',
      label: 'Altura do pai',
      type: 'number'
    }
  ]
};
```

---

### 3. Registro do cálculo

```js
export const calculations = {
  altura: {
    label: 'Altura',
    fn: calculateAltura,
    config: alturaConfig
  }
};
```

---

## Funcionamento da Interface

### Home

* Lista todos os cálculos disponíveis
* Navega para a tela de cálculo selecionado

---

### Calculator

* Renderiza inputs dinamicamente com base no `config`
* Inputs suportados:

  * `number` → campo numérico
  * `select` → dropdown (Picker)
* Executa o cálculo e exibe:

  * resultado
  * explicação

---

## Padrão de Retorno dos Cálculos

Todos os cálculos devem retornar:

```ts
{
  result: string,
  explanation: string
}
```

Isso garante compatibilidade com a UI.

---

## Convenções

* Não colocar lógica de cálculo dentro das telas
* Todo cálculo deve ficar em `/calculations`
* Inputs são definidos via configuração (não hardcoded)
* Sempre validar dados antes de executar cálculo

---

## Como adicionar um novo cálculo

1. Criar arquivo em `/calculations`
2. Implementar função de cálculo
3. Criar configuração de inputs
4. Registrar no `index.js`

Nenhuma alteração na UI é necessária.

---

## Estado Atual

* Navegação funcional
* Formulário dinâmico implementado
* Suporte a múltiplos tipos de input
* Cálculo de altura funcionando

---

## Próximos Passos

* Persistência com SQLite
* Histórico de cálculos (global e por tipo)
* Edição e exclusão de registros
* Melhorias de UI/UX

---
