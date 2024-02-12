import { Contract } from "ethers";
import hre, { ethers } from "hardhat"
const utils = require("../main.js");
const constants = require("../constants.json");

export async function deployProxy(Token: Contract): Promise<Contract> {
    const Proxy = await ethers.deployContract("Proxy", [Token.target, constants.networks[hre.network.name]["endpoint"]]);
    await Proxy.waitForDeployment();

    utils.saveAddress("Proxy_" + hre.network.name, Proxy.target)

    return Proxy
}
