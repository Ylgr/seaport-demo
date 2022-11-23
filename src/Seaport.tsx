import React, {useState} from 'react';
import {Network, OpenSeaSDK} from "opensea-js";
// import Web3 from 'web3';
import { useAccount } from 'wagmi';
// import UniversalProvider from "@walletconnect/universal-provider";
import {useProvider} from 'wagmi'
import {providers} from "ethers";


function Seaport(params: {projectId: string}) {
    const { address, connector, isConnected } = useAccount()
    const [ethereumProvider, setEthereumProvider] = useState();
    const provider = useProvider()
    if(isConnected) {
        const createProvider = async () => {
            console.log('UniversalProvider: ', provider)
            console.log('UniversalProvider2: ', window.ethereum)

            // setEthereumProvider(provider);
            // @ts-ignore
            const openseaSDK = new OpenSeaSDK(window.ethereum)
            // const web3 = new providers.Web3Provider(provider)
            // const web3 = new providers.Web3Provider(window.ethereum)
            // console.log(await web3.listAccounts())
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
