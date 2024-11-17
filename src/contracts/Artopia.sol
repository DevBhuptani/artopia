// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



 import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



interface IOracle {
    function read() external view returns (uint256);
    function lastUpdated() external view returns (uint256);
}


contract IndependentURINFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

        address oracle = 0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660;

    
    // Mapping from token ID to its complete URI
    mapping(uint256 => string) private _tokenURIs;
    
    constructor() ERC721("IndependentURINFT", "INFT") {}
    
    // Function to mint NFT with a complete URI
    function mintNFT(address recipient, string memory completeURI) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        require(bytes(completeURI).length > 0, "URI cannot be empty");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(recipient, newTokenId);
        _tokenURIs[newTokenId] = completeURI;
        
        emit TokenURISet(newTokenId, completeURI);
        
        return newTokenId;
    }
    
    // Override tokenURI function to return the complete stored URI
    function tokenURI(uint256 tokenId) 
        public 
        view 
        virtual 
        override 
        returns (string memory) 
    {
        
        string memory uri = _tokenURIs[tokenId];
        require(bytes(uri).length > 0, "Token URI not set");
        
        return uri;
    }
    
    // Function to get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getPrice() external view returns (uint256) {
        return IOracle(oracle).read();
    }
    
    // Event emitted when a token URI is set
    event TokenURISet(uint256 indexed tokenId, string uri);
}