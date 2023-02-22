'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");


let providerUrl: any;
let privateKey: any;

export async function getTransactionHash(
    transactionHash: string,
    networkUrl: string,
) {
    try {
        const web3 = new Web3(networkUrl);
        const response = await web3.eth.getTransactionReceipt(
            '0xc737531f440c8526c1b5eace67c08fd7ed188ea012a7b47db3f97469c9a01e8a',
        );
        return response;
    } catch (e) {
        console.error('error', e);
        return false;
    }
}

export async function getWalletBalanceInEther(
    providerUrl: string,
    address: string,
) {
    const web3 = await new Web3(providerUrl);
    const balanceInWei = await web3.eth.getBalance(address);
    const ether = await web3.utils.fromWei(balanceInWei, 'ether');
    return ether;
}

export async function getConversionRate(network: any, toBeConverted: any) {
    try {
        const ethereumPriceURL = `https://min-api.cryptocompare.com/data/price?fsym=${network}&tsyms=${toBeConverted}`;
        const resp = await axios.get(ethereumPriceURL);
        console.log(resp)
        return resp.data[Object.keys(resp.data)[0]];
    } catch (ex) {
        return false;
    }
}

export async function getGraphData(network: any, toBeConverted: any) {
    try {
        const ccUrl = `${process.env.CRYPTO_API_URL}v2/histoday?fsym=${network}&tsym=${toBeConverted}&limit=10`;
        const resp = await axios.get(ccUrl);
        for (var key in resp) {
            for (var dataKey in resp[key]) {
                var finalData = resp[key][dataKey]
            }
        }
        return finalData;
    } catch (ex) {
        return false;
    }
}


export async function percentage(partialValue: any, totalValue: any) {
    let value = partialValue / totalValue * 100;
    let percent = Math.round(value);
    return percent;
}

export async function webIntialize() {
    const web3 = new Web3('http://localhost:8545');
}
export async function webPrivatekey() {
    const providerUrl = process.env.INFURA_URL
    const privateKey = process.env.PRIVATE_KEY
    const localKeyProvider = new HDWalletProvider(
        [privateKey],
        providerUrl,
    );
    const web3 = new Web3(localKeyProvider);
}

export async function contractInstance() {
    const contractAddress = process.env.CONTRACT_ADDRESS
    const providerUrl = process.env.INFURA_URL
    const web3 = new Web3(privateKey);
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

}

export async function web3getbalance() {

    const web3 = new Web3(process.env.INFURA_URL);
    const address = process.env.WALLET_ADDRESS;
    const balance = await web3.eth.getBalance(address);
    console.log(balance)
}


export async function getTokenBalance() {
    const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    const tokenContractABI = [{ ...}];
    const web3 = await new Web3(providerUrl);
    const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);


    const balance = await tokenContract.methods.balanceOf(process.env.WALLET_ADDRESS).call();
    console.log(balance)
}

export async function getTransactionReceipt() {
    const url = process.env.INFURA_URL
    const web3 = new Web3(url);
    const transaction = await web3.eth.getTransactionReceipt(process.env.WALLET_ADDRESS);
    console.log(transaction)
}


// async function transferToken(from, to, amount) {
//     const options = {
//       from: from,
//       gasPrice: '<GAS_PRICE>',
//       gas: '<GAS_LIMIT>'
//     };
//     const tx = await tokenContract.methods.transfer(to, amount).send(options);
//     console.log(`Transaction hash: ${tx.transactionHash}`);
//   }

export async function moralisnftListOfAnAddress() {
    await Moralis.start({
        apiKey: "J2PssSLgubh4ainuAWiwR0KFw1U4sERe1sp3XsLVD0oXRJq3dOJL3LeRe5GuTycT",
    });

    const address = process.env.WALLET_ADDRESS;

    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });

    console.log(response.toJSON());
}
















