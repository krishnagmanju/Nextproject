import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from 'web3';
import { connectDB } from '../../services/database/connection';

import transactionHistory from '../../services/transaction';
import transactSchema from '../../services/database/schema/transactionschema';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await connectDB();
    transactionHistory();
    const collection= await transactSchema.find({});
    

    res.status(200).send({ Collection:collection});
  }

  else {
    
    res.status(200).json({ message: "NOT GET METHOD" })
  }
}
