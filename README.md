# Polygon Nameserver (PNS)

This is a simple name server service for the Polygon Network.
Users can mint domains (.matic) which resemble are human readable name of their wallet address.

The smart contract could be extended to store more information like email, profile picture, ...

## Deployment:
### Frontend:
The frontend is deployed using github pages:

https://illing2005.github.io/polygon-name-server/

### Contracts
The smart contracts are deployed to the mumbai test network:

Domains: [0x87b2a28Cb7AB3C59D7dA867DE9B7521E7a2E61FE](https://mumbai.polygonscan.com/address/0x87b2a28Cb7AB3C59D7dA867DE9B7521E7a2E61FE)

## Features
### Frontend

- users mint their domain name
- uses OpenSea API to display already minted tokens

### Solidity Contracts
- implement the ERC721 token standard.
- uses on chain metadata storage

