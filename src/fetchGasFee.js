const fetch = require('node-fetch-commonjs')

// gas prices in GWei
// {
//   safeLow: { maxPriorityFee: 30.432873118, maxFee: 30.856392851 },
//   standard: { maxPriorityFee: 32.10845491973333, maxFee: 32.53197465273333 },
//   fast: { maxPriorityFee: 38.12678128466666, maxFee: 38.55030101766666 },
//   estimatedBaseFee: 0.423519733,
//   blockTime: 6,
//   blockNumber: 32467145
// }

module.exports = { 
  fetchGasFee: async () => {
    const priceResponse = await fetch('https://gasstation-mainnet.matic.network/v2');
    const currentGasFee = await priceResponse.json();
    return currentGasFee["fast"]; // safeLow, standard, fast
  }
}