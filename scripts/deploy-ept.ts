import { deployLZEndpoint } from "./func/deploy.LZEndpoint";

async function main() {

  const LZEndpoint = await deployLZEndpoint()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
