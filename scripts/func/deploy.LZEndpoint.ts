import { Contract } from "ethers";
import hre, { ethers } from "hardhat"
const utils = require("../main.js");

const endpointIds = {
    ["localhost6"]: 0,
    ["localhost"]: 1
} as any

export async function deployLZEndpoint(): Promise<Contract> {
    const LZEndpoint = await ethers.deployContract("LZEndpoint", [endpointIds[hre.network.name]]);
    await LZEndpoint.waitForDeployment();

    await utils.saveJson("networks", hre.network.name, { endpointId: endpointIds[hre.network.name], endpoint: LZEndpoint.target })

    return LZEndpoint
}
