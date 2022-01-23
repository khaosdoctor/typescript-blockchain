# Blockchain TypeScript

> 🇧🇷 Uma implementação simples de blockchain em TypeScript.

## Descrição

Esta é uma implementação simples de blockchain no TypeScript. Os objetivos são puramente educacionais.

Esta é __não__ uma implementação de blockchain com todos os recursos. Pretende-se apenas mostrar como usar os conceitos básicos de blockchain.

Por enquanto, não é distribuída. No entanto, há planos para torná-la ainda mais robusta e distribuída usando comunicação em rede.

Características atuais:

- Executa em um único nó
- Pode ser usado para criar uma nova blockchain
- Pode ser usado para adicionar novos blocos a uma blockchain existente
- Pode ser usado para verificar a validade de um bloco
- Os blocos suportam quaisquer dados em seus `payloads`

Características futuras:

- Salvar e ler a blockchain em um arquivo
- Adicionar suporte a transações
- Adicionar suporte a ramificações
- Adicionar suporte a tokens
- Rede distribuída
- Consenso distribuído
- Transações distribuídas
- Mineração distribuída

## Instalação

```bash
npm i
```

## Uso

É preciso um único parâmetro opcional que é a dificuldade do processo de mineração. O padrão é `4`.

```bash
npm start [dificuldade = 4]
```

## Tarefas de um futuro próximo

- [ ] Rede distribuída
- [ ] Refatorar para tornar os blocos uma classe em vez de uma interface para que possa ter métodos internos para calcular hashes e nonces
- [ ] Adicionar um pequeno frontend para visualizar a blockchain como um gráfico
