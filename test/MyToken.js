// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("ICO", function () {
  let token;
  let ico;

  beforeEach(async function () {
    const ICOToken = await ethers.getContractFactory("ICOToken");
    token = await ICOToken.deploy();
    await token.deployed();
    const ICO = await ethers.getContractFactory("ICO");
    ico = await ICO.deploy(token.address);
    await ico.deployed();

    // await token.mint(ico.address, ethers.utils.parseEther("500000"));
  });

  it("should start ICO", async function () {
    await ico.startICO();
    const isICOActive = await ico.isICOActive();
    expect(isICOActive).to.be.true;
  });

  it("should stop ICO", async function () {
    await ico.startICO();
    await ico.stopICO();
    const isICOActive = await ico.isICOActive();
    expect(isICOActive).to.be.false;
  });

  it("should deposit", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.01");
    await ico.deposit({ value: amount });
    const depositAmount = await ico.deposits(await ethers.provider.getSigner(0).getAddress());
    expect(depositAmount).to.equal(amount);
  });

  it("should not deposit if ICO is not active", async function () {
    const amount = ethers.utils.parseEther("0.01");
    await expect(ico.deposit({ value: amount })).to.be.revertedWith("ICO is not active");
  });

  it("should not deposit if amount is less than minimum purchase", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.004");
    await expect(ico.deposit({ value: amount })).to.be.revertedWith("Amount is less than minimum purchase");
  });

  it("should not deposit if amount is more than maximum purchase", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.06");
    await expect(ico.deposit({ value: amount })).to.be.revertedWith("Amount is more than maximum purchase");
  });

  it("should not deposit if deposit exceeds maximum purchase amount", async function () {
    await ico.startICO();
    const amount1 = ethers.utils.parseEther("0.03");
    const amount2 = ethers.utils.parseEther("0.03");
    await ico.deposit({ value: amount1 });
    await expect(ico.deposit({ value: amount2 })).to.be.revertedWith("Deposit exceeds maximum purchase amount");
  });

  it("should not deposit if hardcap is reached", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("1.1");
    await ico.deposit({ value: amount });
    await expect(ico.deposit({ value: amount })).to.be.revertedWith("Hardcap reached");
  });

  it("should withdraw", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.01");
    await ico.deposit({ value: amount });
    await ico.stopICO();
    await ico.withdraw();
    const balance = await ethers.provider.getBalance(await ethers.provider.getSigner(0).getAddress());
    expect(balance).to.equal(amount);
  });

  it("should not withdraw if ICO is still active", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.01");
    await ico.deposit({ value: amount });
    await expect(ico.withdraw()).to.be.revertedWith("ICO is still active");
  });

  it("should not withdraw if softcap is reached", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.01");
    await ico.deposit({ value: amount });
    await ico.stopICO();
    await expect(ico.withdraw()).to.be.revertedWith("Softcap reached");
  });

  it("should not withdraw if no deposits to withdraw", async function () {
    await ico.startICO();
    await ico.stopICO();
    await expect(ico.withdraw()).to.be.revertedWith("No deposits to withdraw");
  });

  it("should claim", async function () {
    await ico.startICO();
    const amount = ethers.utils.parseEther("0.1");
    await ico.deposit({ value: amount });
    await ico.stopICO();
    await ico.claim();
    const tokenBalance = await token.balanceOf(await ethers.provider.getSigner(0).getAddress());
    expect(tokenBalance).to.equal(amount.mul(1000));
  });
});