import { Contract } from "ethers";
import hre, { ethers } from "hardhat"
const utils = require("../main.js");

export async function deployToken(): Promise<Contract> {

    const Token = await ethers.deployContract("Token", ["Token", "TKO"]);
    await Token.waitForDeployment();

    utils.saveAddress("Token_" + hre.network.name, Token.target)

    return Token
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
