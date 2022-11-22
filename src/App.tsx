import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import Seaport from "./Seaport";
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

function App() {
    const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ''
    const   chains = [chain.goerli];

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
        <>
            <WagmiConfig client={wagmiClient}>
                <Web3Button/>
            </WagmiConfig>
            <Seaport projectId={projectId}/>
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
