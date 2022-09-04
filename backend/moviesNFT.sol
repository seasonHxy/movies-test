// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {

    struct Movies {
        address owner;      // NFT owner
        string movie_title; 
        string movie_uri;   // 
    } 

    mapping(uint => Movies) private _movies;

    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https//www.ipfs/";
    }
}