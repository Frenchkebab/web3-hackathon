require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const Convenience = await ethers.getContractFactory('Convenience');
  const convenience = await Convenience.deploy(
    '0x52AC897baaED3db416729221897D641d756Ceb73'
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
