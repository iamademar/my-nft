
# 1) What are some examples of fungible tokens compared to non-fungible tokens that you use that are not blockchain related?

## Understanding Fungible and Non-Fungible Tokens

#### **Fungible Tokens (FTs):**
Imagine you have something that can be swapped with an identical item without losing or gaining value—like money. If you lend your friend a $10 bill, it doesn't matter if they give you back the same bill or a different $10 bill; they're worth the same.

- **In short**: Fungible tokens are things that are exactly the same in value and can be easily exchanged for one another.

#### **Non-Fungible Tokens (NFTs):**
Now, think of something unique—like a piece of art or a concert ticket. No two are exactly the same. If you lend a friend a concert ticket for a front-row seat, you wouldn't want them to return a ticket for a seat in the back row because the value is different.

- **In short**: Non-fungible tokens are unique, one-of-a-kind items that can't be exchanged directly for another of the same type because they're different in some way.

##### Examples of Fungible Tokens (FTs) in Everyday Life:
1. **Currency**: Any $10 bill is the same as another $10 bill.
2. **Gift Cards**: A $50 gift card for Amazon is the same as any other $50 Amazon gift card.
3. **Points**: Airline miles or credit card rewards points—one mile or point is the same as another.
4. **Commodities**: Things like gold or oil. An ounce of gold from one source is the same as an ounce from another.

##### Examples of Non-Fungible Tokens (NFTs) in Everyday Life:
1. **House Deeds**: Each property is unique, and the deed represents ownership of a specific one.
2. **Artwork**: A painting by an artist is unique, even if two pieces look similar.
3. **Event Tickets**: Tickets for a concert or sporting event differ in value based on seat location or perks.
4. **Identification Cards**: Your passport or driver’s license is specific to you and cannot be swapped with someone else’s.

# 2) How much gas did you pay to deploy your contract? What are some implications of the gas auction fees model?

I paid 0.00145635 ETH to deploy your Ethereum contract. The gas fee refers to the computational cost required to deploy the contract. At the time of contract deployment, the gas price you pay on Ethereum is influenced by several key factors:

1) **Network Demand** - When many users are interacting with the Ethereum network at once (e.g., popular decentralized apps, NFT drops, or token transfers), demand for processing power increases.

2) **Complexity of the Contract** - Ethereum transactions are priced based on the amount of computational resources they use, measured in units of gas. 

3) **Gas Limit and Gas Used**
  - The gas limit is the maximum amount of gas you’re willing to pay for a transaction.
  - The gas used is the actual amount of gas consumed to process the transaction.

4) **Gas Price (gwei)** - The gas price is the amount of gwei (a small fraction of ETH, where 1 ETH = 1 billion gwei) you are willing to pay per unit of gas

The gas auction model operates like a bidding system, where higher bidders are prioritized by miners. Some implications of this model include:

- **Unpredictable Fees**: Gas fees fluctuate based on network activity, making it difficult to predict exact costs.
- **Transaction Delays**: If you set a lower gas price, your transaction may take longer to be processed or be stuck in the network.
- **High Costs During Network Congestion**: Popular events (e.g., NFT sales or high DeFi usage) can drastically increase fees, pricing out smaller transactions.

https://etherscan.io/gastracker gives you real-time insights into gas prices across the Ethereum network. It shows the average gas price in gwei for different transaction speeds (slow, standard, fast) based on the current demand.


# 3. Change the metadata and mint another NFT 

You can see the changes I've created to modify the metadata and mint another NFT here:
https://github.com/iamademar/my-nft/compare/main...metadata-update-and-mint

### Changes:

On `nft-metadata.json`, these are the changes:
```
{
    "attributes": [
      {
        "trait_type": "Course",
        "value": "Blockchain Technology"
      },
      {
        "trait_type": "Name",
        "value": "Vitalik Buterin"
      }
    ],
    "description": "Course Credits Certificate in Blockchain Technology",
    "image": "https://gateway.pinata.cloud/ipfs/QmWFoFkGxcPcudMPSRH3Uavgv9vv87RBakd5M6QWoXDD45",
    "name": "Advanced Blockchain Certificate"
}
```

On `scripts/mint-nft.js`:
I changed this line:
```
mintNFT("ipfs://QmWFoFkGxcPcudMPSRH3Uavgv9vv87RBakd5M6QWoXDD45")
```

### Results:
- Contract Address in etherscan: https://holesky.etherscan.io/address/0xa2074923fe1F5c29C6e94aeb080B607170B2203B
- Original Token Address in etherscan: https://holesky.etherscan.io/tx/0xd5e628cd949fcd166b931d0637106ed1c1ad60d2e7895016d044c8d20faa79e6P
- Modified Token Address in etherscan: https://holesky.etherscan.io/tx/0x27affae6ccf187ca639dd13cd8d517f15b90353c58c95ea629966e26e4638077


# 4. Write a script to generate a new random NFT every time `mint` is called

To generate a new random NFT every time the mint function is called, I modified both the smart contract and the minting script. I also had to update deploy.js for the naming convention changes on the contract.

The changes I created can be seen here:
https://github.com/iamademar/my-nft/compare/main...generate-random-nft-on-mint

The main changes are on 

`MyNFT.sol`:
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SimpleRandomNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SimpleRandomNFT", "SRNFT") {}

    function mintNFT(address recipient)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(recipient, newItemId);
        
        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, tokenId))) % 100;
        
        return string(abi.encodePacked(
            "https://example.com/api/token/",
            Strings.toString(tokenId),
            "?random=",
            Strings.toString(randomNumber)
        ));
    }
}
```

`mint-nft.js`:
```
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
```


and `deploy.js`:
```
async function main() {
    const SimpleRandomNFT = await ethers.getContractFactory("SimpleRandomNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const simpleRandomNFT = await SimpleRandomNFT.deploy()
    await simpleRandomNFT.deployed()
    console.log("Contract deployed to address:", simpleRandomNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
```

### Results

1) Random NFT Contract:
https://holesky.etherscan.io/address/0x42F9887199bedf38Ad64a51f746f61795080264f

---

I minted two random nft:

2) Random NFT 1:
https://holesky.etherscan.io/tx/0xb584c529bb27b9f020b86234c40edef6debf58ce72eb40e92a12d1410b57ad8f

3) Random NFT 2:
https://holesky.etherscan.io/tx/0x4587da93ff7bd4a9932804a665e7c5f174184d0322ce130dc5bae158f928ae8b

Here's a screen dump of the results:
<img width="579" alt="Screenshot 2024-10-04 at 1 14 05 PM" src="https://github.com/user-attachments/assets/0e382aac-e9ec-48b3-ad47-9612d9c953f3">
