require('dotenv').config();
const ethers = require('ethers');
const airnodeAdmin = require('@api3/airnode-admin');
const evm = require('../src/evm');
const parameters = require('../src/parameters');
const { fetchGasFee } = require('../src/fetchGasFee');

async function main() {
  const airnode = await evm.getAirnode();

  const currentGasFee = await fetchGasFee();
  const maxPriorityFeePerGas = Math.round(currentGasFee.maxPriorityFee);
  const maxFeePerGas = Math.round(currentGasFee.maxFee);

  console.log('maxPriorityFeePerGas: ', maxPriorityFeePerGas);
  console.log('maxFeePerGas: ', maxFeePerGas);

  await airnodeAdmin.updateAuthorizers(
    airnode,
    parameters.providerId,
    parameters.endpointId,
    [ethers.constants.AddressZero]
    // {
    //   maxPriorityFeePerGas: ethers.utils.parseUnits(
    //     `${maxPriorityFeePerGas}`,
    //     'gwei'
    //   ),
    //   maxFeePerGas: ethers.utils.parseUnits(`${maxFeePerGas}`, 'gwei'),
    // }
  );
  console.log(
    `Updated authorizers of endpoint with ID ${parameters.endpointId} to allow all public requests`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
