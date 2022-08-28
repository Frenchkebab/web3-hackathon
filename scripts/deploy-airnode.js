require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const Airnode = await ethers.getContractFactory('Airnode');
  const airdnode = await Airnode.deploy();
  await airdnode.deployed();
  console.log('contract deployed to: ', airdnode.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
