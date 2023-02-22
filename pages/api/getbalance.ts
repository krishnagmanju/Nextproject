import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from 'web3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {

    const web3 = new Web3('https://goerli.infura.io/v3/3418d04467cd490188b6674cdf6cfc2e');
    const balance = await web3.eth.getBalance(req.body.address);

    res.status(200).send({ value: balance });
  }

  else {
    //Handle any other HTTP method
    res.status(200).json({ message: "NOT GET METHOD" })
  }
}
