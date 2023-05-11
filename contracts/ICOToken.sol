// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ICOToken is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 5000 * 10 ** 18;

    constructor() ERC20("ICO", "ICO") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract ICO is Ownable {
    ICOToken public token;
    mapping(address => uint256) public deposits;
    uint256 public softCap = 100_000_000_000_000_000;
    uint256 public hardCap = 1_000_000_000_000_000_000;
    uint256 public rate = 1000;
    uint256 public depositedAmount = 0;
    uint256 public minPurchase = 10_000_000_000_000_000;
    uint256 public maxPurchase = 50_000_000_000_000_000;
    uint256 public startTime = 1620364800; // May 7th, 2023 at 0 AM GMT
    uint256 public endTime = 1730649600; // May 9th, 2023 at 0 AM GMT
    bool public isICOActive = false;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdraw(address indexed depositor, uint256 amount);
    event Claim(address indexed investor, uint256 amount);
    event Received(address indexed investor, uint256 amount);

    constructor(ICOToken _token) {
        token = _token;
    }

    receive() external payable {
        deposit();
        // emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        deposit();
    }

    // function startICO() public onlyOwner {
    //     require(!isICOActive, "ICO is already active");
    //     require(block.timestamp >= startTime, "ICO has not started yet");
    //     require(block.timestamp < endTime, "ICO has ended");
    //     isICOActive = true;
    // }

    // function stopICO() public onlyOwner {
    //     require(isICOActive, "ICO is not active");
    //     isICOActive = false;
    // }

    function deposit() public payable {
        console.log("Deposit");
        // require(isICOActive, "ICO is not active");
        require(
            msg.value >= minPurchase,
            "Amount is less than minimum purchase"
        );
        require(
            msg.value <= maxPurchase,
            "Amount is more than maximum purchase"
        );
        // require(
        //     deposits[msg.sender] + msg.value <= maxPurchase,
        //     "Deposit exceeds maximum purchase amount"
        // );
        // require(address(this).balance <= hardCap, "Hardcap reached");
        require(depositedAmount + msg.value <= hardCap, "Hardcap reached");
        console.log("Confirm Deposit");
        depositedAmount += msg.value;
        deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() public {
        // require(!isICOActive, "ICO is still active");
        // require(address(this).balance < softCap, "Softcap reached");
        require(depositedAmount <= softCap, "Softcap reached");
        require(deposits[msg.sender] > 0, "No deposits to withdraw");

        uint256 amount = deposits[msg.sender];
        // depositedAmount -= amount;
        deposits[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function claim() public {
        // require(!isICOActive, "ICO is still active");
        // require(address(this).balance >= softCap, "Softcap not reached");
        require(depositedAmount >= softCap, "Softcap not reached");
        require(deposits[msg.sender] > 0, "No deposits to claim");

        uint256 amount = deposits[msg.sender] * rate;
        deposits[msg.sender] = 0;
        token.transfer(msg.sender, amount);
        emit Claim(msg.sender, amount);
    }
}
