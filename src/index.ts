import { BlockChain } from './blockchain'

const blockchain = new BlockChain(Number(process.argv[2] || 4))
let chain = blockchain.chain

for (let i = 1; i <= 2; i++) {
  const block = blockchain.createBlock(`Block ${i}`)
  const mineInfo = blockchain.mineBlock(block)
  // console.log(mineInfo)
  chain = blockchain.pushBlock(mineInfo.minedBlock)
}

console.log('CHAIN')
console.log(chain)
