import { Address } from 'cluster';
import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from 'web3';
const HDWalletProvider = require("@truffle/hdwallet-provider");


const PRIVATE_KEY='7d59d30f1d4e7d73b3c11dcf849790e3327c65855e29e1aa1e1996a8bd9bb3f0';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
  
    const tx = {
        from:req.body.address,
        to: req.body.to,
        value:req.body.value,
        gas: 50000
    };
    const localKeyProvider = new HDWalletProvider({
        privateKeys: [PRIVATE_KEY],
        providerOrUrl:'https://goerli.infura.io/v3/3418d04467cd490188b6674cdf6cfc2e' ,
      });
      const web3 = new Web3(localKeyProvider);
    
    const transfer = await web3.eth.accounts.signTransaction(tx,PRIVATE_KEY );
    await web3.eth.sendSignedTransaction(transfer.rawTransaction || '').on(
        "receipt", (receipt) => {
            console.log(receipt);
    
            res.send({
                message: "transferred",
                receipt
            });
   
        });

        
    }else {
    //Handle any other HTTP method
    res.status(200).json({ message: "NOT POST METHOD" })
  }
}