require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: {
     version: "0.8.20",
     settings: {
       optimizer: {
         enabled: true,
         runs: 200
       }
     }
   },
   defaultNetwork: "holesky",
   networks: {
      hardhat: {},
      holesky: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         ensAddress: null,
         ens: {
            enabled: false
         }
      }
   },
   paths: {
      sources: "./contracts",
   },

};