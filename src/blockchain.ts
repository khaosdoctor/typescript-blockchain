import { hash, isHashProofed } from './helpers'

export interface Block {
  header: {
    nonce: number
    blockHash: string
  }
  payload: {
    sequence: number
    timestamp: number
    data: any
    previousHash: string
  }
}

export class BlockChain {
  #chain: Block[] = []
  private powPrefix = '0'

  constructor (private readonly difficulty: number = 4) {
    this.#chain.push(this.createGenesisBlock())
  }

  private createGenesisBlock () {
    const payload = {
      sequence: 0,
      timestamp: +new Date(),
      data: 'Genesis Block',
      previousHash: ''
    }
    return {
      header: {
        nonce: 0,
        blockHash: hash(JSON.stringify(payload))
      },
      payload
    }
  }

  private get lastBlock (): Block {
    return this.#chain.at(-1) as Block
  }

  get chain () {
    return this.#chain
  }

  private getPreviousBlockHash () {
    return this.lastBlock.header.blockHash
  }

  createBlock (data: any) {
    const newBlock = {
      sequence: this.lastBlock.payload.sequence + 1,
      timestamp: +new Date(),
      data,
      previousHash: this.getPreviousBlockHash()
    }

    console.log(`Created block ${newBlock.sequence}: ${JSON.stringify(newBlock, null, 2)}`)
    return newBlock
  }

  mineBlock (block: Block['payload']) {
    let nonce = 0
    let startTime = +new Date()

    while (true) {
      const blockHash = hash(JSON.stringify(block))
      const proofingHash = hash(blockHash + nonce)

      if (isHashProofed({
        hash: proofingHash,
        difficulty: this.difficulty,
        prefix: this.powPrefix
      })) {
        const endTime = +new Date()
        const shortHash = blockHash.slice(0, 12)
        const mineTime = (endTime - startTime) / 1000

        console.log(`Mined block ${block.sequence} in ${mineTime} seconds. Hash: ${shortHash} (${nonce} attempts)`)

        return {
          minedBlock: { payload: { ...block }, header: { nonce, blockHash } },
          minedHash: proofingHash,
          shortHash,
          mineTime
        }
      }
      nonce++
    }
  }

  verifyBlock (block: Block) {
    if (block.payload.previousHash !== this.getPreviousBlockHash()) {
      console.error(`Invalid block #${block.payload.sequence}: Previous block hash is "${this.getPreviousBlockHash().slice(0, 12)}" not "${block.payload.previousHash.slice(0, 12)}"`)
      return
    }

    if (!isHashProofed({
      hash: hash(hash(JSON.stringify(block.payload)) + block.header.nonce),
      difficulty: this.difficulty,
      prefix: this.powPrefix
    })) {
      console.error(`Invalid block #${block.payload.sequence}: Hash is not proofed, nonce ${block.header.nonce} is not valid`)
      return
    }

    return true
  }

  pushBlock (block: Block) {
    if (this.verifyBlock(block)) this.#chain.push(block)
    console.log(`Pushed block #${JSON.stringify(block, null, 2)}`)
    return this.#chain
  }
}
