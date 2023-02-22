import Web3 from 'web3';
import { Tx } from 'web3/eth/types';
const HDWalletProvider = require("@truffle/hdwallet-provider");

import { connectDB } from '../services/database/connection';
import transactSchema from './database/schema/transactionschema';




export default async function transactionHistory() {

    const db = await connectDB();
    console.log(db)

    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/3418d04467cd490188b6674cdf6cfc2e'));
    // console.log (web3)
    let address = '0xBB7495884F80849f3828FC1339CeDD288434Ad59';

    const subscription = await web3.eth.subscribe('newBlockHeaders', async function (error, result) {
        if (!error) {
            // console.log(result);
            const blknumber = result.number;
            // console.log(blknumber, 'block number');
            const tx = await web3.eth.getBlock(blknumber, true);
            for (var i = 0; i < tx.transactions.length; i++) {

                if (tx.transactions[i].from == address || tx.transactions[i].to == address) {
                    console.log("initialized")

                    const transactionobj = new transactSchema({
                        from: tx.transactions[i].from,
                        to: tx.transactions[i].to,
                        txhash: tx.hash
                    })
                    transactionobj.save();
                    console.log(tx.transactions[i].from, tx.transactions[i].to, tx.hash)

                }
            }
            return
        }
        console.error(error);
    })
}

