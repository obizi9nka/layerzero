const constants = require("../scripts/constants.json")

import { MessagingFeeStruct, Proxy, SendParamStruct } from "../typechain-types/contracts/Proxy.sol/Proxy"

import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { Options } from '@layerzerolabs/lz-v2-utilities'

module.exports = async function (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) {
    const localContract = constants.addresses["Proxy_" + hre.network.name]

    if (!localContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // get local contract
    const signer = await hre.ethers.getSigners()
    const localContractInstance = await hre.ethers.getContractAt("Proxy", localContract, signer[0]) as unknown as Proxy

    // get remote chain id
    const remoteEndpoinId = constants.networks[taskArgs.dst]["endpointId"] as number

    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()

    const sendParams: SendParamStruct = {
        dstEid: remoteEndpoinId,
        to: hre.ethers.toBeHex(taskArgs.to, 32),
        amountLD: BigInt(taskArgs.value) * BigInt(10 ** 18),
        minAmountLD: BigInt(taskArgs.value) * BigInt(10 ** 17),
        extraOptions: options,
        composeMsg: "0x",
        oftCmd: "0x"
    }

    // console.log(sendParams)


    const data = await localContractInstance.quoteSend(sendParams, false)

    const messagingFee: MessagingFeeStruct = {
        nativeFee: data[0],
        lzTokenFee: data[1]
    }

    // const messagingFee: MessagingFeeStruct = {
    //     nativeFee: BigInt(0.002 * (10 ** 18)),
    //     lzTokenFee: 0
    // }

    console.log(messagingFee)
    try {
        let tx = await (await localContractInstance.send(sendParams, messagingFee, signer[0].address, { value: messagingFee.nativeFee }))
            .wait()
        if (tx != null) {
            console.log(`✅ Token Sent [${hre.network.name}] send(to:${taskArgs.to}, value:${taskArgs.value}) to OFT @ LZ chain[${taskArgs.dst}-${remoteEndpoinId}]`)
            console.log(` tx: ${tx.hash}`)
        }

    } catch (e) {
        console.log(e)
    }

}



// module.exports = async function (taskArgs, hre) {
//     let signers = await ethers.getSigners()
//     let owner = signers[0]
//     let toAddress = owner.address
//     let qty = ethers.utils.parseEther(taskArgs.qty)

//     let localContract, remoteContract

//     if (taskArgs.contract) {
//         localContract = taskArgs.contract
//         remoteContract = taskArgs.contract
//     } else {
//         localContract = taskArgs.localContract
//         remoteContract = taskArgs.remoteContract
//     }

//     if (!localContract || !remoteContract) {
//         console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
//         return
//     }

//     let toAddressBytes = ethers.utils.defaultAbiCoder.encode(["address"], [toAddress])

//     // get remote chain id
//     const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]

//     // get local contract
//     const localContractInstance = await ethers.getContract(localContract)

//     // quote fee with default adapterParams
//     let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example

//     let fees = await localContractInstance.estimateSendFee(remoteChainId, toAddressBytes, qty, false, adapterParams)
//     console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)

//     let tx = await (
//         await localContractInstance.sendFrom(
//             owner.address, // 'from' address to send tokens
//             remoteChainId, // remote LayerZero chainId
//             toAddressBytes, // 'to' address to send tokens
//             qty, // amount of tokens to send (in wei)
//             {
//                 refundAddress: owner.address,
//                 zroPaymentAddress: ethers.constants.AddressZero,
//                 adapterParams,
//             },
//             { value: fees[0] }
//         )
//     ).wait()
//     console.log(`✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`)
//     console.log(` tx: ${tx.transactionHash}`)
//     console.log(`* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab !"`)
// }