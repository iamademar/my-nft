
# 1. What are some examples of fungible tokens compared to non-fungible tokens that you use that are not blockchain related?

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

# 2. How much gas did you pay to deploy your contract? What are some implications of the gas auction fees model?

I paid 0.00145635 ETH to deploy your Ethereum contract. The gas fee refers to the computational cost required to deploy the contract. At the time of contract deployment, the gas price you pay on Ethereum is influenced by several key factors:

1) **Network Demand** - When many users are interacting with the Ethereum network at once (e.g., popular decentralized apps, NFT drops, or token transfers), demand for processing power increases.

2) **Complexity of the Contract** - Ethereum transactions are priced based on the amount of computational resources they use, measured in units of gas. 

3) **Gas Limit and Gas Used**
  - The gas limit is the maximum amount of gas you’re willing to pay for a transaction.
  - The gas used is the actual amount of gas consumed to process the transaction.

4) **Gas Price (gwei)** - The gas price is the amount of gwei (a small fraction of ETH, where 1 ETH = 1 billion gwei) you are willing to pay per unit of gas

https://etherscan.io/gastracker gives you real-time insights into gas prices across the Ethereum network. It shows the average gas price in gwei for different transaction speeds (slow, standard, fast) based on the current demand.


# 3. Change the metadata and mint another NFT 

You can see the changes I've created to modify the metadata and mint another NFT here:
https://github.com/iamademar/my-nft/compare/main...metadata-update-and-mint

### Results:
- Contract Address in etherscan: https://holesky.etherscan.io/address/0xa2074923fe1F5c29C6e94aeb080B607170B2203B
- Original Token Address in etherscan: https://holesky.etherscan.io/tx/0xd5e628cd949fcd166b931d0637106ed1c1ad60d2e7895016d044c8d20faa79e6P
- Modified Token Address in etherscan: https://holesky.etherscan.io/tx/0x27affae6ccf187ca639dd13cd8d517f15b90353c58c95ea629966e26e4638077