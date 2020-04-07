pragma solidity >= 0.5.0 < 0.7.0;


import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
contract MyToken is ERC20, ERC20Detailed {
  constructor() ERC20Detailed('MyToken', 'MTK', 1) public {
    _mint(msg.sender, 10000000);
  }
}
