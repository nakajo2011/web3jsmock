const Faucet = require('../src/model/faucet')
const Web3 = require('web3')

const CONTRACT_ADDRESS = '0xadDf5bC8b45571D94e2FD46Bfb81f8dD6D6f9FA0'
const FROM_ADDRESS = '0x259de638f0d6d79dfa084a810c1356d4d575b62e'

const mockGetPastEvents = jest.fn().mockImplementation(() => {
  return [{
    returnValues: {
      from: '0xe62d87b603dc9b8a5535d41aa464f583cc476aa8',
      to: '0x259de638f0d6d79dfa084a810c1356d4d575b62e',
      value: 100
    }
  }]
})
const mockTransfer = jest.fn().mockImplementation(() => {
  return {
    send: jest.fn().mockImplementation(() => {
      return true
    })
  }
})
const mockContract = {
  getPastEvents: mockGetPastEvents,
  methods: {
    transfer: mockTransfer
  }
}
Web3.__setMockContract(mockContract)
describe('Faucet', function () {
  describe('init', function () {
    it('should be return instance', async () => {
      const ins = new Faucet(CONTRACT_ADDRESS, FROM_ADDRESS)
      expect(ins).toBeDefined()
    })
  })
  describe('test functions', function () {
    beforeEach(() => {
      mockTransfer.mockClear()
    })
    it('getPastEventOption when block 100', async () => {
      const ins = new Faucet(CONTRACT_ADDRESS, FROM_ADDRESS)

      const option = await ins.getPastEventOption()
      expect(option).toEqual({fromBlock: 0, toBlock: 'latest'})
    })
    it('getPastEventOption when block 65536', async () => {
      Web3.__setBlockNumber(65535)
      const ins = new Faucet(CONTRACT_ADDRESS, FROM_ADDRESS)
      const option = await ins.getPastEventOption()
      expect(option).toEqual({fromBlock: (65535 - (24 * 60 * 4)), toBlock: 'latest'})
    })
    it('isAlreadyWitdrawed', async () => {
      const ins = new Faucet(CONTRACT_ADDRESS, FROM_ADDRESS)
      await ins.loadLatestDayTransfers()
      const result = await ins.isAlreadyWitdrawed('0x259de638f0d6d79dfa084a810c1356d4d575b62e')
      expect(result).toBeTruthy()
    })
    it('sendToken', async () => {
      const ins = new Faucet(CONTRACT_ADDRESS, FROM_ADDRESS)
      const toAddress = '0xe62d87b603dc9b8a5535d41aa464f583cc476aa8'
      await ins.sendToken(toAddress)
      // check that send just 100 token.
      expect(mockTransfer).toHaveBeenCalledWith(toAddress, 100)
    })
  })
})