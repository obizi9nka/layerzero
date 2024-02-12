import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks"
require('dotenv').config()


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true
        }
      },
      viaIR: true
    },
  },
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY_1 as string],
      url: `https://sepolia.infura.io/v3/${process.env.INFURA}`,
    },
    linea: {
      chainId: 59140,
      accounts: [process.env.PRIVATE_KEY_1 as string],
      url: "https://rpc.goerli.linea.build",
    },
    mumbai: {
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY_1 as string],
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA}`,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    localhost6: {
      url: "http://127.0.0.1:8546"
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN as string,
      polygonMumbai: process.env.POLYGONSCAN as string
    }
  }
};

export default config;
