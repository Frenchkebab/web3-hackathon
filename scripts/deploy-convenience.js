require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const Convenience = await ethers.getContractFactory('Convenience');
  const convenience = await Convenience.deploy(
    '0xA9C42aB428281A80E7F9056aA8A589013B8a5a95'
  );
  await convenience.deployed();
  console.log('contract deployed to: ', convenience.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
