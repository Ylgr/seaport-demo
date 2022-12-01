import React, {useState} from 'react';
import { useAccount } from 'wagmi';
import {providers} from "ethers";
import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";
import {parseEther} from "ethers/lib/utils";
import {ItemType} from "@opensea/seaport-js/lib/constants";
import {OrderWithCounter} from "@opensea/seaport-js/lib/types";
import Seadrop from "./abi/Seadrop.json"

function SeaportDemo(params: {projectId: string}) {
    const { address, connector, isConnected } = useAccount()
    const [order, setOrder] = useState<OrderWithCounter>();
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const seadrop = new ethers.Contract('0x00005EA00Ac477B1030CE78506496e8C2dE24bf5', Seadrop, signer)
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
                <h1>----------------------------------------------</h1>
                <br/>
                <label>Seaport</label>
                <br/>
                <button onClick={async () => {

                }} disabled>Get order (Open sea still not support public backend for seaport)</button>
                <br/>
                <label>Basic case: </label>
                <button onClick={async () => {
                    const offerer = (await provider.listAccounts())[0]
                    const { executeAllActions } = await seaport.createOrder(
                        {
                            offer: [
                                {
                                    itemType: ItemType.ERC721,
                                    token: "0x3A1d177cD56dE031CEfCb0E4357666D96fD7ccf0",
                                    // token: "0x4977dFeDaC2886af3BDEb85AE20E5D0eDe17909D",
                                    identifier: "1",
                                },
                            ],
                            consideration: [
                                {
                                    amount: parseEther("10").toString(),
                                    // ERC20
                                    // token: "0x43ea565d44E0BF3af9Fe3f1F68655a383C13646D",
                                    token: "0x4977dFeDaC2886af3BDEb85AE20E5D0eDe17909D",
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
                }}>Fulfill order</button>
                <button onClick={async () => {
                    if(order) {
                        const { transact } = seaport.cancelOrders([order.parameters])
                        console.log(await (await transact()).wait())
                    } else {
                        alert('Not have any order!')
                    }
                }}>Cancel order</button>
                <br/>
                <label>Current order: </label>
                {order? <>
                    <p><b>Offerer:</b> {order.parameters.offerer} - <b>Token:</b> {order.parameters.offer[0].token} - <b>IdentifierOrCriteria:</b> {order.parameters.offer[0].identifierOrCriteria} - <b>Start amount:</b> {order.parameters.offer[0].startAmount} - <b>End amount:</b> {order.parameters.offer[0].endAmount}</p>
                    <p><b>Consideration</b> - <b>Token:</b> {order.parameters.consideration[0].token} - <b>IdentifierOrCriteria: </b> {order.parameters.consideration[0].identifierOrCriteria} - <b>Start amount:</b> {order.parameters.consideration[0].startAmount} - <b>End amount:</b> {order.parameters.consideration[0].endAmount}</p>
                </>: ''}
                <br/>
                <label>Get info: </label>
                <button onClick={async () => {
                    console.log(await seaport.getCounter((await provider.listAccounts())[0]))
                }}>Get counter</button>
                <button onClick={async () => {
                    if(order) {
                        console.log(await seaport.getOrderStatus(seaport.getOrderHash(order.parameters)))
                    }
                }}>Get order status</button>
                <br/>
                <h1>----------------------------------------------</h1>
                <br/>
                <label>Shipyard (currently only work on ethereum mainnet): </label>
                <button onClick={async () => {
                    {
                        const { transact } = await seaport.setDomain('Broken moon')
                        console.log(await (await transact()).wait())
                    }}}>Set domain</button>
                <button onClick={async () => {}}>Get domain</button>
                <br/>
                <h1>----------------------------------------------</h1>
                <br/>
                <label>Seadrop: </label>
                <button onClick={async () => {
                    await seadrop.mintPublic('0x2ab4Cd18057C7a3df47902cD5F28E628A00f17E0', '0xDb5bFab9fC8D9c3F4c6fd12D686E3Fadb14F6A62', '0x0000000000000000000000000000000000000000', 3,
                        {value: parseEther('0.0003').toString()})
                }}>Mint</button>
            </>
            )

    } else return (<></>)


}
export default SeaportDemo;
