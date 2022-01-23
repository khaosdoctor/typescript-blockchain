import { hash, isHashProofed } from './helpers'

export interface Block {
  sequence: number
  timestamp: number
  data: any
  previousHash: string
  nonce?: number
  blockHash?: string
}

export class BlockChain {
  #chain: Block[] = []
  private powPrefix = '0'

  constructor (private readonly difficulty: number = 4) {
    this.#chain.push(this.createGenesisBlock())
  }

  private createGenesisBlock () {
    return {
      sequence: 0,
      timestamp: +new Date(),
      data: 'Genesis Block',
      previousHash: '',
      nonce: 0,
      blockHash: ''
    }
  }

  private get lastBlock (): Block {
    return this.#chain.at(-1) as Block
  }

  get chain () {
    return this.#chain
  }

  private getPreviousBlockHash () {
    const { nonce, blockHash, ...previousBlock } = this.lastBlock
    return hash(JSON.stringify(previousBlock))
  }

  createBlock (data: any) {
    const newBlock = {
      sequence: this.lastBlock.sequence + 1,
      timestamp: +new Date(),
      data,
      previousHash: this.getPreviousBlockHash()
    }

    console.log(`Created block ${newBlock.sequence}: ${JSON.stringify(newBlock, null, 2)}`)
    return newBlock
  }

  mineBlock (block: Block) {
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
          minedBlock: { ...block, nonce, blockHash },
          minedHash: proofingHash,
          shortHash,
          mineTime
        }
      }
      nonce++
    }
  }

  verifyBlock (block: Block) {
    if (block.previousHash !== this.getPreviousBlockHash()) {
      console.error(`Invalid block #${block.sequence}: Previous block hash is "${this.getPreviousBlockHash().slice(0, 12)}" not "${block.previousHash.slice(0, 12)}"`)
      return
    }

    const { nonce, blockHash, ...blockPayload } = block

    if (!isHashProofed({
      hash: hash(hash(JSON.stringify(blockPayload)) + nonce),
      difficulty: this.difficulty,
      prefix: this.powPrefix
    })) {
      console.error(`Invalid block #${block.sequence}: Hash is not proofed, nonce ${nonce} is not valid`)
      return
    }

    return true
  }

  pushBlock (block: Block) {
    if (this.verifyBlock(block)) this.#chain.push(block)
    return this.#chain
  }
}
