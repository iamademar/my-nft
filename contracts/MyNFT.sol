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