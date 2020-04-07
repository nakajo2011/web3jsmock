const Web3 = require('web3')
const Faucet = require('./faucet')
const BLOCK_NUMBER_PER_DAY = 24 * 60 * 4
const contractJson = require('../../build/contracts/MyToken')

class FaucetWithProvider extends Faucet {
  constructor(provider, address, fromAddress) {
    super(address, fromAddress)
    this.provider = new Web3(provider)
    this.myToken = new this.provider.eth.Contract(contractJson.abi, address, {from: fromAddress})
  }
}

module.exports = FaucetWithProvider
