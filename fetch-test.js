import fetch from 'node-fetch';

fetch('https://gasstation-mainnet.matic.network/v2')
  .then((response) => response.json())
  .then((json) => console.log(json));
