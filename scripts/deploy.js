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
