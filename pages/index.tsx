import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { injected } from "../components/wallets/connectors";
import { useState, useEffect } from 'react';
import getInstance from "../services/web3"
import { Grid, Paper } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';

function Home() {

  let connected;
  const [value, setValue] = useState('')
  const [key, setKey] = useState('')
  const [keys, setKeys] = useState<string[]>([]);
  const [select, selectValue] = useState('');
  const [buttonText, setButtonText] = useState('Connect');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const { active, account, library, activate, deactivate } = useWeb3React();

  const handleOnChangeValue = (event: any) => {
    setValue(event.target.value)

  }
  const handleOnChangeKey = (event: any) => {
    setKey(event.target.value)
  }
  const handleOnChangeSelect = (event: any) => {
    selectValue(event.target.value)
  }

  useEffect(() => {
    if (active) {
      getKeys()
    }
    return () => console.log("unmount")
  }, [account])
  useEffect(() => {
    activate(injected);
  }, [])

  // to connect
  async function connectOnLoad() {
    try {
      //here we use activate to create the connection
      await activate(injected)
      connected = true
    } catch (ex) {
      console.log(ex)
    }

  }
  async function execute() {
    const contractInstance = getInstance(active, library)

    if (contractInstance) {
      try {
        const set = await contractInstance.methods.set(key, value).send({ from: account });
        console.log(set)
        console.log(set.transactionHash)
        setHash(set.transactionHash)
        setValue('')
        setKey('')
        // await getvalue()
        await getKeys()
      } catch (ex) {
        console.log(ex)
      }
    } else {
      return alert('wallet not connected')
    }

  }

  async function getvalue() {
    const contractInstance = await getInstance(active, library)
    if (contractInstance) {
      console.log(contractInstance)
      try {
        const get = await contractInstance.methods.get(select).call({ from: account });
        console.log(get)
        alert(get)
        setKey('')
      } catch (ex) {
        console.log(ex)
      }
    }
  }

  async function getKeys() {
    const contractInstance = await getInstance(active, library)
    if (contractInstance) {
      console.log(contractInstance)
      try {
        const keys = await contractInstance.methods.getKeys().call({ from: account });
        console.log(keys)
        setKeys(keys);

      } catch (ex) {
        console.log(ex)
      }
    }
  }
  

  function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div>

      <Grid >
        <Grid item>
          <Paper sx={{
            height: 300,
            width: 500,
            border: '1px solid black',
            marginLeft: '50px',
            paddingTop: '50px',

          }}> <h3 style={{ textAlign: 'center' }}>Connect Metamask Wallet</h3> <br /> <br />
            Status:{active ? <span>Connected </span> : <span>Not connected</span>}
            <br />
            Public Address:{active ? <span>{account}</span> : <span>Not connected</span>}
            <br />
          
            {active ? <button onClick={disconnect}>Disconnect</button> : <button onClick={connectOnLoad}>Connect Wallet</button>}

          </Paper>
        </Grid>
      </Grid>

      <Grid >
        <Grid item>
          <Paper sx={{
            height: 300,
            width: 600,
            border: '1px solid black',
            marginLeft: '50px',
            paddingTop: '10px',

          }}> <h3 style={{ textAlign: 'center' }}>Magic Number</h3>
            <Grid >
              <Grid item>
                <Paper sx={{
                  height: 50,
                  width: 580,
                  border: '1px solid black',
                  marginLeft: '10px',

                }}>
                  <label>
                    keys
                  </label>
                  {
                    (typeof keys !== 'undefined' && keys !== null) ?
                      <select onChange={handleOnChangeSelect}>
                        <option disabled={true}>Select keys</option>
                        {keys.map((key: string) => {
                          return <option key={key}>{key}</option>;
                        })}
                      </select>
                      :
                      <div></div>
                  }
                  <button onClick={getvalue}>get </button>
                </Paper>
              </Grid>
            </Grid>  <br />

            <Grid >
              <Grid item>
                <Paper sx={{
                  height: 140,
                  width: 580,
                  border: '1px solid black',
                  marginLeft: '10px',

                }}> <p>Enter key: <input type="string" value={key} onChange={handleOnChangeKey}></input>  <br />
                    Enter value: <input type="number" value={value} onChange={handleOnChangeValue}></input>
                    <button onClick={execute}>set </button><br />Transaction Hash : {hash}</p>
                    
                </Paper>
              </Grid>
            </Grid>

          </Paper>
        </Grid>
      </Grid>


    </div>
  )
}
export default Home;