const expect = require('chai').expect
const FaucetWithProvider = require('../../src/model/faucet_with_provider')
const Web3 = require('web3')
const sinon = require('sinon')

const CONTRACT_ADDRESS = '0xadDf5bC8b45571D94e2FD46Bfb81f8dD6D6f9FA0'
const FROM_ADDRESS = '0x259de638f0d6d79dfa084a810c1356d4d575b62e'

const eventLogsResponse = (id) => {
  return {
    'id': id,
    'jsonrpc': '2.0',
    'result': [
      {
        'logIndex': '0x0',
        'transactionIndex': '0x0',
        'transactionHash': '0x20296b88aaa350f30b33644fefea9653945c0515d75924182bc8cacf334b5adb',
        'blockHash': '0x10c32458bf56fce150e8284f168073e06e856e34d5228492feee2c039a21c444',
        'blockNumber': '0x3',
        'address': '0xaddf5bc8b45571d94e2fd46bfb81f8dd6d6f9fa0',
        'data': '0x0000000000000000000000000000000000000000000000000000000000989680',
        'topics': [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x000000000000000000000000e62d87b603dc9b8a5535d41aa464f583cc476aa8'
        ],
        'type': 'mined'
      },
      {
        'logIndex': '0x0',
        'transactionIndex': '0x0',
        'transactionHash': '0xf395f3b74f94d5c9ae81c6053a8beea38a627a9fbe414c13d83f9f1215c64cc3',
        'blockHash': '0xbfe2621fc2241002a48e2c72fbeac8724f8645dca0e1f7946175a348fa2e4c9c',
        'blockNumber': '0x5',
        'address': '0xaddf5bc8b45571d94e2fd46bfb81f8dd6d6f9fa0',
        'data': '0x0000000000000000000000000000000000000000000000000000000000000064',
        'topics': [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x000000000000000000000000e62d87b603dc9b8a5535d41aa464f583cc476aa8',
          '0x000000000000000000000000259de638f0d6d79dfa084a810c1356d4d575b62e'
        ],
        'type': 'mined'
      },
      {
        'logIndex': '0x0',
        'transactionIndex': '0x0',
        'transactionHash': '0x58d6ea17e2b7d3d33d7efc70e9d54bd24d1c0ea34635aa60b44c971bbd06382f',
        'blockHash': '0x58e3fec7e6c0cd6387036d1d51c1a91ad0d39d86044e3ba685dbf19864263326',
        'blockNumber': '0x6',
        'address': '0xaddf5bc8b45571d94e2fd46bfb81f8dd6d6f9fa0',
        'data': '0x0000000000000000000000000000000000000000000000000000000000000064',
        'topics': [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x000000000000000000000000e62d87b603dc9b8a5535d41aa464f583cc476aa8',
          '0x000000000000000000000000240d6af2ef0ab553e6a8e10b513a46e286325a5c'
        ],
        'type': 'mined'
      }
    ]
  }
}

const sendTransactionResponse = (id) => {
  return {
    'id': id, 'jsonrpc': '2.0', 'result': '0xf395f3b74f94d5c9ae81c6053a8beea38a627a9fbe414c13d83f9f1215c64cc3'
  }
}

const getTransactionReceiptResponse = (id) => {
  return {
    'id': id,
    'jsonrpc': '2.0',
    'result': {
      'transactionHash': '0xf395f3b74f94d5c9ae81c6053a8beea38a627a9fbe414c13d83f9f1215c64cc3',
      'transactionIndex': '0x0',
      'blockHash': '0x1ab1d682485bd21791d40c64e30c5f19cdb3ea52d5f0111ca2d1b11a1665a98f',
      'blockNumber': '0x5',
      'from': '0xe62d87b603dc9b8a5535d41aa464f583cc476aa8',
      'to': '0xaddf5bc8b45571d94e2fd46bfb81f8dd6d6f9fa0',
      'gasUsed': '0xc844',
      'cumulativeGasUsed': '0xc844',
      'contractAddress': null,
      'logs': [
        {
          'logIndex': '0x0',
          'transactionIndex': '0x0',
          'transactionHash': '0xf395f3b74f94d5c9ae81c6053a8beea38a627a9fbe414c13d83f9f1215c64cc3',
          'blockHash': '0x1ab1d682485bd21791d40c64e30c5f19cdb3ea52d5f0111ca2d1b11a1665a98f',
          'blockNumber': '0x5',
          'address': '0xaddf5bc8b45571d94e2fd46bfb81f8dd6d6f9fa0',
          'data': '0x0000000000000000000000000000000000000000000000000000000000000064',
          'topics': [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x000000000000000000000000e62d87b603dc9b8a5535d41aa464f583cc476aa8',
            '0x000000000000000000000000259de638f0d6d79dfa084a810c1356d4d575b62e'
          ],
          'type': 'mined'
        }
      ],
      'status': '0x1',
      'logsBloom': '0x00000000000004000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000408000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000010000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000002000000000000000000000000040000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000'
    }
  }
}
describe('FaucetWithProvider', function () {
  describe('init', function () {
    it('should be return instance', async () => {
      const ins = new FaucetWithProvider({}, CONTRACT_ADDRESS, FROM_ADDRESS)
      expect(ins).to.be.ok
    })
  })
  describe('test functions', function () {
    it('getPastEventOption when block 100', async () => {
      const provider = new Web3.providers.HttpProvider('')
      const func = (data, cb) => {
        cb(null, {'id': data.id, 'jsonrpc': '2.0', 'result': '0x64'})
      }
      const stub = sinon.stub(provider, 'send').callsFake(func)
      const ins = new FaucetWithProvider(provider, CONTRACT_ADDRESS, FROM_ADDRESS)

      const option = await ins.getPastEventOption()
      expect(option).to.deep.equal({fromBlock: 0, toBlock: 'latest'})
    }),
      it('getPastEventOption when block 65536', async () => {
        const provider = new Web3.providers.HttpProvider('')
        const func = (data, cb) => {
          cb(null, {'id': data.id, 'jsonrpc': '2.0', 'result': '0xffff'})
        }
        const stub = sinon.stub(provider, 'send').callsFake(func)
        const ins = new FaucetWithProvider(provider, CONTRACT_ADDRESS, FROM_ADDRESS)

        const option = await ins.getPastEventOption()
        expect(option).to.deep.equal({fromBlock: (65535 - (24 * 60 * 4)), toBlock: 'latest'})
      })
    it('isAlreadyWitdrawed', async () => {
      const provider = new Web3.providers.HttpProvider('')
      const func = (data, cb) => {
        if (data.method === 'eth_getLogs') {
          cb(null, eventLogsResponse(data.id))
        } else {
          cb(null, {'id': data.id, 'jsonrpc': '2.0', 'result': '0xffff'})
        }
      }
      sinon.stub(provider, 'send').callsFake(func)
      const ins = new FaucetWithProvider(provider, CONTRACT_ADDRESS, FROM_ADDRESS)
      await ins.loadLatestDayTransfers()
      const result = await ins.isAlreadyWitdrawed('0x259de638f0d6d79dfa084a810c1356d4d575b62e')
      expect(result).to.be.true
    })
    it('sendToken', async () => {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545')
      const stub = sinon.stub(provider, 'send').callsFake((data, cb) => {
        if (data.method === 'eth_getTransactionReceipt') {
          cb(null, getTransactionReceiptResponse(data.id))
        } else {
          cb(null, sendTransactionResponse(data.id))
        }
      })
      // const spy = sinon.spy(provider, "send")
      const ins = new FaucetWithProvider(provider, CONTRACT_ADDRESS, FROM_ADDRESS)
      await ins.sendToken('0xe62d87b603dc9b8a5535d41aa464f583cc476aa8')
      // check that send just 100 token.
      expect(stub.getCall(1).args[0].params[0].data).to.includes("0000000000000000000000000000000000000000000000000000000000000064")
    })
  })
})