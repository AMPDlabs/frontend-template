export const contractAddress = "0x0fcd93B145C317cF53307C740346cf0764b9FFAD";
export const abi = [{ "inputs": [], "name": "createMatch", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getIncompleteMatches", "outputs": [{ "components": [{ "internalType": "uint256", "name": "matchId", "type": "uint256" }, { "internalType": "address", "name": "player1", "type": "address" }, { "internalType": "address", "name": "player2", "type": "address" }, { "internalType": "uint256", "name": "bet1", "type": "uint256" }, { "internalType": "uint256", "name": "bet2", "type": "uint256" }, { "internalType": "bool", "name": "complete", "type": "bool" }, { "internalType": "uint256", "name": "result", "type": "uint256" }], "internalType": "struct CoinFlip.Match[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "matchId", "type": "uint256" }], "name": "joinMatch", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "lifetimeValue", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "matches", "outputs": [{ "internalType": "uint256", "name": "matchId", "type": "uint256" }, { "internalType": "address", "name": "player1", "type": "address" }, { "internalType": "address", "name": "player2", "type": "address" }, { "internalType": "uint256", "name": "bet1", "type": "uint256" }, { "internalType": "uint256", "name": "bet2", "type": "uint256" }, { "internalType": "bool", "name": "complete", "type": "bool" }, { "internalType": "uint256", "name": "result", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalMatches", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];