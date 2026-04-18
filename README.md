# Calculadora Endócrina (App Mobile)

## Objetivo

Aplicação mobile offline desenvolvida em React Native para realização de cálculos utilizados em endocrinologia (ex: IMC, TMB, testosterona, entre outros).

O app não possui autenticação e não depende de internet. Todos os dados são armazenados localmente utilizando SQLite.

## Lembrando

Ao iniciar a aplicação, lembre de dar o comando `npm i` que vai baixar todos os pacotes que estamos usando.

---

## Tecnologias utilizadas

* React Native (Expo)
* JavaScript (sem TypeScript)
* SQLite (armazenamento local)
* React Navigation

---

## Estrutura do projeto

```
/src
 ├── components/        # Componentes reutilizáveis
 ├── screens/           # Telas do app
 ├── navigation/        # Configuração de rotas
 ├── database/          # SQLite (conexão e queries)
 ├── calculations/      # Lógica dos cálculos
 ├── constants/         # Listas e definições fixas
```

---

## Conceito do app

O fluxo principal é:

1. Usuário escolhe um tipo de cálculo
2. Insere os dados necessários
3. O app calcula o resultado
4. O resultado é exibido com explicação
5. O usuário pode salvar o cálculo no histórico

---

## Diretrizes de UI/UX

### 1. Simplicidade

* Interface deve ser direta e objetiva
* Evitar excesso de elementos na tela
* Cada tela deve ter uma função clara

---

### 2. Consistência

* Manter padrão visual entre telas
* Mesmos tipos de botões, inputs e espaçamentos
* Mesma hierarquia de informação

---

### 3. Fluxo de uso

* O usuário deve conseguir:

  * Escolher um cálculo rapidamente
  * Inserir dados sem confusão
  * Entender o resultado sem esforço

---

### 4. Inputs

* Sempre indicar claramente o que deve ser preenchido
* Usar placeholders e labels
* Validar dados antes de calcular

Exemplo:

* Peso (kg)
* Altura (m)

---

### 5. Resultado

* Mostrar resultado em destaque
* Exibir explicação logo abaixo
* Separar visualmente resultado e explicação

---

### 6. Histórico

* Lista simples e organizada
* Cada item deve conter:

  * Título editável
  * Tipo de cálculo
  * Data
* Permitir:

  * Visualizar
  * Editar título
  * Excluir

---

### 7. Feedback visual

* Botões devem indicar ação claramente
* Estados de erro devem ser visíveis
* Evitar ações silenciosas (sempre dar retorno ao usuário)

---

## Organização de responsabilidades

### UI (components / screens)

* Responsável apenas por interface e interação
* Não implementar lógica de cálculo aqui

---

### Cálculos (calculations/)

* Toda lógica matemática deve ficar isolada
* Retorna apenas:

  * resultado
  * explicação

---

### Banco de dados (database/)

* Responsável por salvar e recuperar dados
* Não misturar com UI

---

## Padrões de desenvolvimento

* Nomear componentes de forma clara (ex: ResultCard, HistoryItem)
* Evitar arquivos muito grandes
* Reutilizar componentes sempre que possível
* Manter código simples e legível

---

## Observações finais

* O foco do projeto é funcionalidade e clareza, não complexidade
* Evitar overengineering
* Qualquer decisão de UI deve priorizar usabilidade

---
