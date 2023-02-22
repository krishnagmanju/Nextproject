import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from 'web3';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
  
    let startBlockNumber = 8172722
    let endBlockNumber = 8220350

    // function checkTransactionCount(startBlockNumber, endBlockNumber) {
    //   console.log(
    //     "Searching for non-zero transaction counts between blocks " +
    //     startBlockNumber +
    //     " and " +
    //     endBlockNumber
    //   );
    const web3 = new Web3('https://goerli.infura.io/v3/3418d04467cd490188b6674cdf6cfc2e');

    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
      let transactions: any = [];


      let block = await web3.eth.getBlock(i);

      if (block != null) {
        // console.log(block)
        if (block.transactions != null && block.transactions.length != 0) {
          for (let txHash of block.transactions) {
            let tx = await web3.eth.getTransactionReceipt(txHash);
            //  console.log(tx)
           

            if (req.body.address == tx.from) {
              console.log(i, tx.from, tx.to);

            }
            if (req.body.address == tx.to) {
              if (tx.from != tx.to)

                console.log(i, tx.from, tx.to);
            }
          };



        }
        try{
         return  res.status(200).json({ message: "success" });
        }catch(err){
          console.log(err)
        }
       


      } else {
        //Handle any other HTTP method
        res.status(200).json({ message: "NOT POST METHOD" })
      }
   

    
    }
  }
}

