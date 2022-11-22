import React, {useState} from 'react';
import {Network, OpenSeaSDK} from "opensea-js";
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
import { useAccount } from 'wagmi';
import UniversalProvider from "@walletconnect/universal-provider";


function Seaport(params: {projectId: string}) {
    const { address, connector, isConnected } = useAccount()
    const [ethereumProvider, setEthereumProvider] = useState<UniversalProvider>();

    if(isConnected) {
        const createProvider = async () => {
            const provider = await UniversalProvider.init({
                projectId: params.projectId,
                logger: 'debug',
                relayUrl: 'https://walletconnect.com/',
            });
            console.log('UniversalProvider: ', provider)

            setEthereumProvider(provider);
            const openseaSDK = new OpenSeaSDK(provider)
        }

        return (
            <>
                <button onClick={() => createProvider()}>Init provider</button>
                <button onClick={() => {
                    console.log('asdsdasdsdsa:', ethereumProvider)
                    // const openseaSDK = new OpenSeaSDK(walletConnectProvider, {
                    //     networkName: Network.Goerli,
                    // })
                }}>Create order</button>
            </>
            )

    } else return (<></>)


}
export default Seaport;
