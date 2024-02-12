import { deployToken } from "./func/deploy.Token"
import { deployProxy } from "./func/deploy.Proxy"

async function main() {

  const Token = await deployToken()
  const Proxy = await deployProxy(Token)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
