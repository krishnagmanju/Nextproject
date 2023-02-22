import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'
import { Web3Provider } from "@ethersproject/providers";
import { connectDB } from '../services/database/connection';

const  getLibrary=(provider:any)=>{
  return new Web3Provider(provider)
};

export default function App({ Component, pageProps }: AppProps) {
    // connectDB()

  return (
  <Web3ReactProvider getLibrary =  {getLibrary}>
    <Component {...pageProps} />
    </Web3ReactProvider>
  
)
}
