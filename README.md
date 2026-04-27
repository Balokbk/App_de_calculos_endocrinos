# Calculadora Endócrina

Aplicativo mobile/web para cálculos clínicos na área de endocrinologia.

## Stack

* React Native (Expo)
* JavaScript / TypeScript
* Styled-components
* SQLite (mobile)
* LocalStorage (web)

---

## Estrutura do Projeto

```
src/
  calculations/     - Funções de cálculo + configuração dos inputs
  screens/
    Home/           - Tela principal + histórico geral
    Calculator/     - Tela de cálculo específico
  database/
    sqlite.js       - Implementação mobile (expo-sqlite)
    web.js          - Implementação web (localStorage)
    index.js        - Abstração por plataforma
  navigation/       - Rotas
```

---

## Como adicionar um novo cálculo

Cada cálculo deve conter:

### 1. Função

Arquivo em `src/calculations/`

```js
export function calculateExemplo(data) {
  const result = ...

  return {
    result,
    explanation: 'Explicação do cálculo'
  };
}
```

---

### 2. Configuração dinâmica

```js
export const exemploConfig = {
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
      name: 'idade',
      label: 'Idade',
      type: 'number'
    }
  ]
};
```

---

### 3. Registrar no index

`src/calculations/index.js`

```js
import { calculateExemplo, exemploConfig } from './exemplo';

export const calculations = {
  exemplo: {
    label: 'Exemplo',
    fn: calculateExemplo,
    config: exemploConfig
  }
};
```

---

## Sistema de Inputs Dinâmicos

A tela de cálculo é gerada automaticamente com base no `config.inputs`.

Tipos suportados:

* `number` → campo numérico
* `select` → dropdown (Picker)

---

## Histórico de Cálculos

### Armazenamento

* Mobile → SQLite
* Web → LocalStorage

### Estrutura salva

```js
{
  id,
  type,
  data,      // JSON string
  result,
  created_at
}
```

---

## Banco de Dados (Mobile)

Arquivo: `src/database/sqlite.js`

A tabela é criada automaticamente ao iniciar o app.

```sql
CREATE TABLE calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  data TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Importante

### Inicialização do banco

O app só deve renderizar após `initDB()`:

* Evita erro: `no such table: calculations`

---

### Dados do histórico

O campo `data` é salvo como string:

```js
JSON.stringify(data)
```

Para usar:

```js
const parsed = JSON.parse(item.data);
```

---

## Funcionalidades atuais

* Seleção de calculadora
* Inputs dinâmicos
* Execução de cálculo
* Histórico geral (Home)
* Histórico por cálculo
* Persistência de dados
* Compatível com Web e Mobile

---

## Padrões do Projeto

* Cada cálculo é isolado
* UI não contém lógica de cálculo
* Banco abstraído por plataforma
* Configuração dirige a UI

---

## Próximas melhorias

* Deletar itens do histórico
* Nomear cálculos (title)
* Validação de inputs
* Melhorias de UI/UX

---

## Observações

* Evitar lógica dentro dos componentes
* Sempre registrar novos cálculos no `index.js`
* Testar tanto no mobile quanto no web
