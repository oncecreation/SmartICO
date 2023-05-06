// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    string name = "ICO";
    string symbol = "ICO";
    uint totalSupply = 5_000;
    uint public unlockTime;
    address payable public owner;
    event Withdrawal(uint amount, uint when);

    mapping(address => uint256) public balanceOf;

    constructor() {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        // require(
        //     block.timestamp < _unlockTime,
        //     "Unlock time should be in the future"
        // );

        // unlockTime = _unlockTime;
        // owner = payable(msg.sender);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log(
            "Unlock time is %o and block timestamp is %o",
            unlockTime,
            block.timestamp
        );

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
