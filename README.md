# TypeScript Blockchain

> 🇺🇸 A simple implementation of blockchain in TypeScript.

> 🇧🇷 Para a versão em Português, clique [aqui](README-pt.md). 🇧🇷

## Description

This is a simple implementation of blockchain in TypeScript. The objectives are purely educational.

This is __not__ a fully featured blockchain implementation. It is only intended to show how to use the basic concepts of blockchain.

For now, it is not distributed. However there are plans to make it even more robust and distributed using network communication.

Current features:

- Runs in a single node
- Can be used to create a new blockchain
- Can be used to add new blocks to an existing blockchain
- Can be used to verify the validity of a block
- Blocks support any data on the payloads

Future features:

- Save the blockchain to a file
- Add transaction support
- Add branching support
- Add token support
- Distributed network
- Distributed consensus
- Distributed transaction
- Distributed mining


## Installation

```bash
npm i
```

## Usage

It takes a two optional parameters which are

- the difficulty of the mining process. Default is `4`.
- the number of blocks to mine. Default is `10`.

```bash
npm start [difficulty = 4] [numberOfBlocks = 10]
```

## Forseeable To-Do

- [ ] Distributed network
- [ ] Refactor to make blocks a class instead of an interface so it can have internal methods to calculate hashes and nonces
- [ ] Add small graph visualization frontend
