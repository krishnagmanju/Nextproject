import Web3 from 'web3';
import contractAbi from '../abis/abi.json'
import { AbiItem } from 'web3-utils';
import * as dotenv from 'dotenv';
dotenv.config();


export default function getInstance(active: boolean, library: any) {
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS : "";

  let contractInstance: any;

  if (library) {
    console.log('helooooo', library);
    console.log(CONTRACT_ADDRESS)
    console.log(contractAbi)
    if (active) {
      const web3 = new Web3(library.provider);
      contractInstance = new web3.eth.Contract(contractAbi as any, CONTRACT_ADDRESS as any);
    }
  }

  return contractInstance;

}