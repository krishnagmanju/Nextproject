import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';



function Home() {

  let connected;
  let web3: any;

  const goerliChainId = 5;
  const sepoliaChainId = 11155111;
  const polygonChainId = 137;

  const [account, setAccount] = useState('');
  const [currentChainId, setchainId] = useState('');
  // to connect
  async function connect() {

    if (window.ethereum) {
      console.log('detected');

      try {
        const account = await (window as any).ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccount(account);
        console.log(account);
        switchNetwork(polygonChainId);

      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('Meta Mask not detected');
    }

  }


  async function getcurrentChainId() {
    const currentChainId = await (window as any).ethereum.request({
      method: 'eth_chainId',
    });
    setchainId(currentChainId);
    console.log(currentChainId);
  }

  async function switchNetwork(chainId: any) {
    const currentChainId = await (window as any).ethereum.request({
      method: 'eth_chainId',
    });

    if (currentChainId != chainId) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }]
        })

      } catch (err: any) {
        console.log(err);
      
      if (err.code === 4902){
        addNetwork(polygonNetwork);
      }
    }
  }
}
      const polygonNetwork = {
        chainId:Web3.utils.toHex(polygonChainId),
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC", // 2-6 characters long
          decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls:["https://polygonscan.com/"]
    }

    async function addNetwork (networkDetails:any){
        try{
            await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    networkDetails
                ]
              });
        }catch(err){
            console.log(err)
        }
    }


    return (
      <div>

        <Grid >
          <Grid item>
            <Paper sx={{
              height: 200,
              width: 500,
              border: '1px solid black',
              marginLeft: '50px',
              paddingTop: '10px',

            }}><h3 style={{ textAlign: 'center' }}> Connect Wallet</h3><br />
              <button onClick={connect}>Connect Wallet</button><br />
              address: {account}<br />
              <button onClick={getcurrentChainId}>ChainId</button><br />
              chainId:{currentChainId}<br />


            </Paper>
          </Grid>
        </Grid>

        <Grid >
          <Grid item>
            <Paper sx={{
              height: 200,
              width: 500,
              border: '1px solid black',
              marginLeft: '50px',
              paddingTop: '10px',

            }}> <h3 style={{ textAlign: 'center' }}> Switch Network</h3><br />
              <button onClick={connect}>Switch Network</button>



            </Paper>
          </Grid>
        </Grid>



      </div>
    )
  }

export default Home;