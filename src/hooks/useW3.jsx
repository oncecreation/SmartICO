import React, { useState } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import Web3 from "web3";
import { abi, contractAddr } from "./../utils/constant";
export const useW3 = () => {
  const { ethereum } = window;
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    // Create an instance of the contract
    const contract = new web3.eth.Contract(abi, contractAddr);
    const myContract = new ethers.Contract(contractAddr, abi, signer);
    // return contract;
    return myContract;
  };
  const deposit = async () => {
    console.log(123123);
    const contract = getContract();
    const bigNumber = ethers.utils.parseEther((40 * 0.001).toString());
    const gasLimit = 400000;
    let tx = await contract.deposit({ value: bigNumber, gasLimit });
    await tx.wait();
  };

  const claim = async () => {
    const contract = getContract();
    const gasLimit = 40000;
    tx = await contract.claim({ gasLimit });
    await tx.wait();
  };
  const withdraw = async () => {
    const contract = getContract();
    const gasLimit = 40000;
    const tx = await contract.claim({ gasLimit });
    await tx.wait();
  };
  const fetchData = async () => {
    const contract = getContract();
    const gasLimit = 400000;
    // console.log(contract.methods.);
    // const address = contract.address;

    const tx = await contract.rate();
    console.log(tx);
  };

  useEffect(() => {}, []);
  return [deposit, claim, withdraw, fetchData];
};
