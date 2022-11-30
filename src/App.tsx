import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import {Chain, chain, configureChains, createClient, WagmiConfig} from "wagmi";
import SeaportDemo from "./SeaportDemo";

function App() {
    const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ''
    // const   chains = [chain.goerli];
    const bscTestnet: Chain = {
        id: 97,
        name: "Binance Smart Chain testnet",
        network: "chapel",
        nativeCurrency: {
            "name": "Test Binance",
            "symbol": "tBNB",
            "decimals": 18
        },
        rpcUrls: {
            "default": "https://rpc.ankr.com/bsc_testnet_chapel",
            "public": "https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        blockExplorers: {
            "default": {
                "name": "Bscscan",
                "url": "https://testnet.bscscan.com"
            }
        },
        testnet: true
    }
    const   chains = [bscTestnet];

    const { provider } = configureChains(chains, [
        walletConnectProvider({ projectId: projectId }),
    ]);
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: modalConnectors({ appName: "web3Modal", chains }),
        provider,
    });
    const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <div className="App">
        <button onClick={() => console.log('chains: ', chains)}>chains</button>
        <>
            <WagmiConfig client={wagmiClient}>
                <Web3Button/>
            </WagmiConfig>
            <SeaportDemo projectId={projectId}/>
            <Web3Modal
                projectId={projectId}
                theme="dark"
                accentColor="default"
                ethereumClient={ethereumClient}
            />
        </>
    </div>
  );
}

export default App;
