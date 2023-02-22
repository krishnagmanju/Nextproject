import type { NextApiRequest, NextApiResponse } from 'next'
import Web3 from 'web3';
import { Tx } from 'web3/eth/types';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { ethers } = require("ethers");
import mongoose from "mongoose";

import {connectDB} from '../../services/database/connection';
import transactSchema  from '../../services/database/schema/transactionschema';
import transactionHistory from '../../services/transaction';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        await connectDB();
        transactionHistory();
        res.status(200).json({ message: "listener initialized" })
    
        
    } else {
        res.status(404).json({ message: "NOT POST METHOD" })
    }
}
        
