require('dotenv').config();
const ethers = require('ethers');
const evm = require('../src/evm');
const util = require('../src/util');
const { fetchGasFee } = require('../src/fetchGasFee')

async function main() {
  const masterWalletAddress = util.readFromReceipt('masterWalletAddress');
  if (!masterWalletAddress) {
    throw new Error('Could not read the master wallet address from the deployment receipt');
  }
  const amount = '0.01'; // ETH
  const wallet = await evm.getWallet();

  const currentGasFee = await fetchGasFee();
  const maxPriorityFeePerGas = Math.round(currentGasFee.maxPriorityFee);
  const maxFeePerGas = Math.round(currentGasFee.maxFee);

  const txReceipt = await wallet.sendTransaction({
    to: masterWalletAddress,
    value: ethers.utils.parseEther(amount),
    maxPriorityFeePerGas: ethers.utils.parseUnits(`${maxPriorityFeePerGas}`, 'gwei'),
    maxFeePerGas: ethers.utils.parseUnits(`${maxFeePerGas}`, 'gwei'),
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
