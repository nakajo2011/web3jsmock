const Web3 = require('web3')
const BLOCK_NUMBER_PER_DAY = 24 * 60 * 4
const contractJson = require('../../build/contracts/MyToken')

class Faucet {
  constructor(address, fromAddress) {
    this.provider = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    this.myToken = new this.provider.eth.Contract(contractJson.abi, address, {from: fromAddress})
  }

  // return in a day transfer
  async loadLatestDayTransfers() {
    const options = await this.getPastEventOption()
    this.events = await this.myToken.getPastEvents("Transfer", options)
  }

  isAlreadyWitdrawed(address) {
    const toList =  this.events.map(e => e.returnValues.to.toLowerCase())
    return toList.includes(address)
  }

  async getPastEventOption() {
    let from = (await this.provider.eth.getBlockNumber()) - BLOCK_NUMBER_PER_DAY
    if(from < 0) {
      from = 0
    }
    return {fromBlock: from, toBlock:'latest'}
  }

  async sendToken(address) {
    return await this.myToken.methods.transfer(address, 100).send()
  }
}

module.exports = Faucet
