import React, {useState} from 'react';
import { useAccount } from 'wagmi';
import {providers} from "ethers";
import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";
import {parseEther} from "ethers/lib/utils";
import {ItemType} from "@opensea/seaport-js/lib/constants";
import {OrderWithCounter} from "@opensea/seaport-js/lib/types";

function SeaportDemo(params: {projectId: string}) {
    const { address, connector, isConnected } = useAccount()
    const [order, setOrder] = useState<OrderWithCounter>();
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const seaport = new Seaport(provider);
    if(isConnected) {
        const logSomething = async () => {
            console.log('await provider.listAccounts(): ', await provider.listAccounts())
            console.log('order: ', order)
        }

        return (
            <>
                <button onClick={() => logSomething()}>Log something</button>
                <br/>
                <label>Basic case: </label>
                <button onClick={async () => {
                    const offerer = (await provider.listAccounts())[0]
                    const { executeAllActions } = await seaport.createOrder(
                        {
                            offer: [
                                {
                                    itemType: ItemType.ERC721,
                                    token: "0x4977dFeDaC2886af3BDEb85AE20E5D0eDe17909D",
                                    identifier: "1",
                                },
                            ],
                            consideration: [
                                {
                                    amount: parseEther("10").toString(),
                                    // ERC20
                                    token: "0x43ea565d44E0BF3af9Fe3f1F68655a383C13646D",
                                    recipient: offerer,
                                },
                            ],
                        },
                        offerer
                    );
                    const _order = await executeAllActions();
                    console.log('order: ', _order)
                    setOrder(_order)
                }}>Create order</button>
                <button onClick={async () => {
                    const fulfiller = (await provider.listAccounts())[0]

                    const { executeAllActions: executeAllFulfillActions } =
                        await seaport.fulfillOrder({
                            order: order as OrderWithCounter,
                        });
                    const transaction = executeAllFulfillActions();
                    console.log('transaction: ', transaction)
                }}>Fullfil order</button>
            </>
            )

    } else return (<></>)


}
export default SeaportDemo;
