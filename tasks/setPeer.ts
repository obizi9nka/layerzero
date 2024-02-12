const constants = require("../scripts/constants.json")

import { Proxy } from "../typechain-types/contracts/Proxy.sol/Proxy"

import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"


module.exports = async function (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) {
    const localContract = constants.addresses["Proxy_" + hre.network.name]
    const remoteContract = constants.addresses["Proxy_" + taskArgs.remote]

    if (!localContract || !remoteContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // get local contract
    const signer = await hre.ethers.getSigners()
    const localContractInstance = await hre.ethers.getContractAt("Proxy", localContract, signer[0]) as unknown as Proxy

    // get remote chain id
    const remoteEndpoinId = constants.networks[taskArgs.remote]["endpointId"] as number

    // check if pathway is already set
    const peerAddress = await localContractInstance.peers(remoteEndpoinId)

    if (peerAddress == "0x0000000000000000000000000000000000000000000000000000000000000000") {
        try {
            let tx = await (await localContractInstance.setPeer(remoteEndpoinId, hre.ethers.toBeHex(remoteContract, 32)))
                .wait()
            console.log(`✅ [${hre.network.name}] setPeer(${remoteEndpoinId}, ${remoteContract})`)
            if (tx != null)
                console.log(` tx: ${tx.hash}`)
        } catch (e) {
            console.log(`❌ [${hre.network.name}] setTrustedRemote(${remoteEndpoinId}, ${remoteContract})`)
            console.log(e)
        }
    } else {
        console.log("*source already set*")
    }
}