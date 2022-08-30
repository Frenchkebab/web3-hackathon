require('dotenv').config();
const fetch = require('node-fetch-commonjs')
const ethers = require('ethers');
const evm = require('../src/evm');
const util = require('../src/util');

// gas prices in GWei
// {
//   safeLow: { maxPriorityFee: 30.432873118, maxFee: 30.856392851 },
//   standard: { maxPriorityFee: 32.10845491973333, maxFee: 32.53197465273333 },
//   fast: { maxPriorityFee: 38.12678128466666, maxFee: 38.55030101766666 },
//   estimatedBaseFee: 0.423519733,
//   blockTime: 6,
//   blockNumber: 32467145
// }

async function main() {
  const masterWalletAddress = util.readFromReceipt('masterWalletAddress');
  if (!masterWalletAddress) {
    throw new Error('Could not read the master wallet address from the deployment receipt');
  }
  const amount = '0.01'; // ETH
  const wallet = await evm.getWallet();

  const priceResponse = await fetch('https://gasstation-mainnet.matic.network/v2');
  const currentGasFee = await priceResponse.json();
  console.log(await currentGasFee.fast.maxPriorityFeePerGas);
  console.log(await currentGasFee.fast.maxFeePerGas);

  const txReceipt = await wallet.sendTransaction({
    to: masterWalletAddress,
    value: ethers.utils.parseEther(amount),
    maxPriorityFeePerGas: currentGasFee.fast.maxPriorityFeePerGas,
    maxFeePerGas: currentGasFee.fast.maxFeePerGas
    // maxPriorityFeePerGas: ethers.utils.parseUnits("40", "gwei"),
    // maxFeePerGas: ethers.utils.parseUnits("40", "gwei"),
  });

  function sent() {
    return new Promise((resolve) => wallet.provider.once(txReceipt.hash, resolve));
  }
  await sent();
  console.log(`Sent ${amount} ETH to the master wallet with address ${masterWalletAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
