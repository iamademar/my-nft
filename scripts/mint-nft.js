require("dotenv").config();
const ethers = require("ethers");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/MyNFT.sol/SimpleRandomNFT.json");

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract instance
const nftContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function mintNFT() {
  try {
    console.log("Minting NFT...");

    // Call the mintNFT function
    const mintTx = await nftContract.mintNFT(signer.address);
    
    // Wait for the transaction to be mined
    const receipt = await mintTx.wait();
    
    console.log("NFT minted successfully!");
    console.log("Transaction hash:", receipt.transactionHash);
    
    // Get the token ID of the minted NFT
    const tokenId = receipt.events[0].args.tokenId.toString();
    console.log("Token ID:", tokenId);
    
    // Get the token URI
    const tokenURI = await nftContract.tokenURI(tokenId);
    console.log("Token URI:", tokenURI);

  } catch (error) {
    console.error("Error minting NFT:", error);
  }
}

mintNFT();