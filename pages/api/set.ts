// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from 'web3';
const HDWalletProvider = require("@truffle/hdwallet-provider");
import contractAbi from '../../abis/abi.json';
import { AbiItem } from 'web3-utils';
import * as dotenv from 'dotenv';
dotenv.config();

//const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS : "";
//const PRIVATE_KEY= process.env.NEXT_PUBLIC_PRIVATE_KEY ? process.env.NEXT_PUBLIC_PRIVATE_KEY : "";
const CONTRACT_ADDRESS = "0x20f7678f7442cbe6696767e79310bB85B8b758E3"
const PRIVATE_KEY="7d59d30f1d4e7d73b3c11dcf849790e3327c65855e29e1aa1e1996a8bd9bb3f0";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === 'POST') {
    // hd wallwt provider( with privatekey,rpc url initialize)
   //const web3 = new Web3 (new Web3.providers.HttpProvider('https://goerli.infura.io/v3/3418d04467cd490188b6674cdf6cfc2e'));
    const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/3418d04467cd490188b6674cdf6cfc2e');
    const localKeyProvider = new HDWalletProvider({
      privateKeys: [PRIVATE_KEY],
      providerOrUrl:'https://goerli.infura.io/v3/3418d04467cd490188b6674cdf6cfc2e' ,
    });
    //web3 initialize
    const web3 = new Web3(localKeyProvider);
    const myAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    // contract instance using web3
    const contractInstance = new web3.eth.Contract( contractAbi as any, CONTRACT_ADDRESS);
    // call  set function 
    const  set = await contractInstance.methods.set(req.body.key,req.body.value).send({ from: myAccount.address });
    console.log(set)

    // (key,value)//
    // Process a POST 
    res.status(200).json({TransactionReceipt:set})
   } 
   else {
    //Handle any other HTTP method
    res.status(200).json({ message:"NOT POST METHOD"})
  }
 
}
