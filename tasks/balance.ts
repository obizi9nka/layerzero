const constants = require("../scripts/constants.json")

import { Token } from "../typechain-types/contracts/Token"

import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"


module.exports = async function (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) {
    const localContract = constants.addresses["Token_" + hre.network.name]

    if (!localContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // get local contract
    const localContractInstance = await hre.ethers.getContractAt("Token", localContract) as unknown as Token


    const balance = await localContractInstance.balanceOf(taskArgs.address)

    console.log(`✅ [${hre.network.name}] address: ${taskArgs.address} balance: ${balance.toString()}`)
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