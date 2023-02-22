import Web3 from 'web3';
import { Grid, Paper } from '@mui/material';
import { useState,useEffect} from 'react';
const bip39 = require('bip39');
const ethers = require('ethers');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { hdkey } = require('ethereumjs-wallet');
const Cryptr = require('cryptr');




export default function Home() {
    interface AccountDetails {PublicAddress:string,Publickey:string,Privatekey:string}

    const [value, setValue] = useState('');
    const [account, setaccount] = useState<AccountDetails[]>([]);
    const [password ,setPassword] = useState('');
    
    const cryptr = new Cryptr('myTotallySecretKey');
    
    useEffect(() => {
        // const mnemonic = bip39.generateMnemonic();
      }, [])

     let mnemonic :any;
    async function generate() {
        setValue(bip39.generateMnemonic())
    }

    async function saveMnemonic(){
        const encryptedString = cryptr.encrypt(value);
        console.log(encryptedString); 
        console.log(cryptr)

        window.localStorage.setItem("mnemonic",encryptedString)
        console.log(window.localStorage)
    }
    const accounts: any = [];

    let count = 11;
    function generateAddressesFromSeed() {

        const seed = bip39.mnemonicToSeedSync(value);
        console.log(seed)
        const hdwallet = hdkey.fromMasterSeed(seed);
        console.log(hdwallet)

        const accounts = []

        for (let i = 0; i < count; i++) {
            const wallet = hdwallet.derivePath(`m/44'/60'/0'/0/${i}`).getWallet();
            const address = "0x" + wallet.getAddress().toString("hex");
            const privateKey = wallet.getPrivateKey().toString("hex");
            const publicKey = wallet.getPublicKey().toString("hex");
            accounts.push({PublicAddress: address, Publickey: publicKey, Privatekey: privateKey });
           
        }
        setaccount(accounts)
        console.log(accounts)

    }

    function getMnemonic(){
       
        const get=window.localStorage.getItem("mnemonic");
        console.log(get)
        const decryptedString = cryptr.decrypt(get);
        console.log(decryptedString); 
        setValue(decryptedString);
    }

    return (
        <div>
            <Grid>
            <Grid item>
                <Paper sx={{
                  height: 100,
                  width: 580,
                  border: '1px solid black',
                  marginLeft: '10px'
                }}>
                <div>
                    <button onClick={generate} > generate mnemonic</button>  <br />
                    mnemonic phrase : {value} <br />
                   
                </div>
                
                
                </Paper>
              </Grid>
            </Grid>
            <br />
            <button onClick={generateAddressesFromSeed}>generate </button>  <br />
            <table border ={1}  cellPadding={10}>
                <tbody>
                <tr>
                    <th>publicAddress</th>
                    <th>publicKey</th>
                    <th>privateKey</th>
                    
                </tr>
                {account.map((d:any) => (
                   
                    <tr>
                        <td>{d.PublicAddress}</td>
                        
                        <td>{d.Publickey}</td>
                        <td>{d.Privatekey}</td>
                       
                    </tr>
                   
                 ))}
               
               </tbody>
            </table> <br />

            <button onClick={saveMnemonic}>save Mnemonic  </button>  <br />

            <button onClick={getMnemonic}>get Mnemonic  </button>  <br />

            
           

        </div>

    )
}
