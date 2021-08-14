    /*
    var networkPopup = document.querySelector('.Network-Popup');
    var tokenErrorPopup = document.querySelector('.TokenErrorPopup');
    var tokenSuccessPopup = document.querySelector('.TokenSuccessPopup');
    var installMetaMaskPopup = document.querySelector('.installMetaMaskPopup');
    var contractAddressText = document.querySelector('.contractAddress');
    var bscscanAddressText = document.querySelector('.bscscanAddress');
    var overlay = document.querySelector('.backgroundOverlay');
    */
    
    var createButton = document.querySelector('.create-form-button');
    
    var chainID;

    var form = document.querySelector('.token-form');
	
	form.addEventListener('submit', function(event){
			event.preventDefault();
			
			createButton.classList.add('loader');
		
			var name = document.querySelector('.token-name').value;
			var symbol = document.querySelector('.token-symbol').value;
			var supply = document.querySelector('.token-supply').value;
			var decimals = document.querySelector('.token-decimals').value;
		
			console.log(name + symbol + supply + decimals);
		
			beforeDeployCheck(name, symbol, supply, decimals);
		
		});
	
	
	function beforeDeployCheck(name, symbol, supply, decimals){
		if(typeof window.ethereum !== 'undefined') {
		    checkNetworkConnection(name, symbol, supply, decimals);
		}else{
			createButton.classList.remove('loader');
			//showInstallMetaMask();
	    }
	}
	
	
	function checkNetworkConnection(name, symbol, supply, decimals){
	    const web3 = new Web3(window.ethereum);
	    var currentNetworkID = web3.eth.net.getId().then(function(result){
	        console.log(result);
	        if(result == 97 || result == 56){
	            chainID = result;
	            deploy(name, symbol, supply, decimals);
	        }
	        else{
	            createButton.classList.remove('loader');
	            //networkError();
	        }
	   });
	}
	
	
	async function deploy(name, symbol, supply, decimals){
		const web3 = new Web3(window.ethereum);
		const accounts = await ethereum.request({method: 'eth_requestAccounts'});
	
		const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "totalSupply_",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "decimals_",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "service_",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

		const bytecode = '0x6080604052604051620026eb380380620026eb83398181016040528101906200002991906200052e565b6200005183600a6200003c919062000871565b876200016a60201b620010411790919060201c565b60028190555084600390805190602001906200006f929190620003d2565b50836004908051906020019062000088929190620003d2565b508260058190555081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000107600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254620001ee60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff166108fc620001316200036760201b60201c565b9081150290604051600060405180830381858888f193505050501580156200015d573d6000803e3d6000fd5b5050505050505062000cd8565b6000808314156200017f5760009050620001e8565b600082846200018f9190620009ae565b9050828482620001a09190620007de565b14620001e3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001da90620006b0565b60405180910390fd5b809150505b92915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000261576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200025890620006d2565b60405180910390fd5b620002b9816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200036f60201b620010bc1790919060201c565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200035b9190620006f4565b60405180910390a35050565b600047905090565b600080828462000380919062000781565b905083811015620003c8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003bf906200068e565b60405180910390fd5b8091505092915050565b828054620003e09062000a83565b90600052602060002090601f01602090048101928262000404576000855562000450565b82601f106200041f57805160ff191683800117855562000450565b8280016001018555821562000450579182015b828111156200044f57825182559160200191906001019062000432565b5b5090506200045f919062000463565b5090565b5b808211156200047e57600081600090555060010162000464565b5090565b60006200049962000493846200073a565b62000711565b905082815260208101848484011115620004b857620004b762000bb0565b5b620004c584828562000a4d565b509392505050565b600081519050620004de8162000ca4565b92915050565b600082601f830112620004fc57620004fb62000bab565b5b81516200050e84826020860162000482565b91505092915050565b600081519050620005288162000cbe565b92915050565b60008060008060008060c087890312156200054e576200054d62000bba565b5b60006200055e89828a0162000517565b965050602087015167ffffffffffffffff81111562000582576200058162000bb5565b5b6200059089828a01620004e4565b955050604087015167ffffffffffffffff811115620005b457620005b362000bb5565b5b620005c289828a01620004e4565b9450506060620005d589828a0162000517565b9350506080620005e889828a01620004cd565b92505060a0620005fb89828a01620004cd565b9150509295509295509295565b600062000617601b8362000770565b9150620006248262000bdd565b602082019050919050565b60006200063e60218362000770565b91506200064b8262000c06565b604082019050919050565b60006200066560248362000770565b9150620006728262000c55565b604082019050919050565b620006888162000a43565b82525050565b60006020820190508181036000830152620006a98162000608565b9050919050565b60006020820190508181036000830152620006cb816200062f565b9050919050565b60006020820190508181036000830152620006ed8162000656565b9050919050565b60006020820190506200070b60008301846200067d565b92915050565b60006200071d62000730565b90506200072b828262000ab9565b919050565b6000604051905090565b600067ffffffffffffffff82111562000758576200075762000b7c565b5b620007638262000bbf565b9050602081019050919050565b600082825260208201905092915050565b60006200078e8262000a43565b91506200079b8362000a43565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620007d357620007d262000aef565b5b828201905092915050565b6000620007eb8262000a43565b9150620007f88362000a43565b9250826200080b576200080a62000b1e565b5b828204905092915050565b6000808291508390505b6001851115620008685780860481111562000840576200083f62000aef565b5b6001851615620008505780820291505b8081029050620008608562000bd0565b945062000820565b94509492505050565b60006200087e8262000a43565b91506200088b8362000a43565b9250620008ba7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484620008c2565b905092915050565b600082620008d45760019050620009a7565b81620008e45760009050620009a7565b8160018114620008fd576002811462000908576200093e565b6001915050620009a7565b60ff8411156200091d576200091c62000aef565b5b8360020a91508482111562000937576200093662000aef565b5b50620009a7565b5060208310610133831016604e8410600b8410161715620009785782820a90508381111562000972576200097162000aef565b5b620009a7565b62000987848484600162000816565b92509050818404811115620009a157620009a062000aef565b5b81810290505b9392505050565b6000620009bb8262000a43565b9150620009c88362000a43565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161562000a045762000a0362000aef565b5b828202905092915050565b600062000a1c8262000a23565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000a6d57808201518184015260208101905062000a50565b8381111562000a7d576000848401525b50505050565b6000600282049050600182168062000a9c57607f821691505b6020821081141562000ab35762000ab262000b4d565b5b50919050565b62000ac48262000bbf565b810181811067ffffffffffffffff8211171562000ae65762000ae562000b7c565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160011c9050919050565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000600082015250565b7f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f60008201527f7700000000000000000000000000000000000000000000000000000000000000602082015250565b7f6d696e74206f74207a65726f2061646472657373206973206e6f7420706f737360008201527f69626c6500000000000000000000000000000000000000000000000000000000602082015250565b62000caf8162000a0f565b811462000cbb57600080fd5b50565b62000cc98162000a43565b811462000cd557600080fd5b50565b611a038062000ce86000396000f3fe6080604052600436106100ab5760003560e01c8063395093511161006457806339509351146101ef57806340c10f191461022c57806370a082311461025557806395d89b4114610292578063a457c2d7146102bd578063a9059cbb146102fa576100b2565b806306fdde03146100b7578063095ea7b3146100e257806318160ddd1461011f5780631a46ec821461014a57806323b872dd14610187578063313ce567146101c4576100b2565b366100b257005b600080fd5b3480156100c357600080fd5b506100cc610337565b6040516100d99190611427565b60405180910390f35b3480156100ee57600080fd5b506101096004803603810190610104919061125d565b6103c9565b604051610116919061140c565b60405180910390f35b34801561012b57600080fd5b506101346104bb565b6040516101419190611549565b60405180910390f35b34801561015657600080fd5b50610171600480360381019061016c91906111ca565b6104c5565b60405161017e9190611549565b60405180910390f35b34801561019357600080fd5b506101ae60048036038101906101a9919061120a565b61054c565b6040516101bb919061140c565b60405180910390f35b3480156101d057600080fd5b506101d961095a565b6040516101e69190611549565b60405180910390f35b3480156101fb57600080fd5b506102166004803603810190610211919061125d565b610964565b604051610223919061140c565b60405180910390f35b34801561023857600080fd5b50610253600480360381019061024e919061125d565b610a09565b005b34801561026157600080fd5b5061027c6004803603810190610277919061119d565b610c21565b6040516102899190611549565b60405180910390f35b34801561029e57600080fd5b506102a7610c69565b6040516102b49190611427565b60405180910390f35b3480156102c957600080fd5b506102e460048036038101906102df919061125d565b610cfb565b6040516102f1919061140c565b60405180910390f35b34801561030657600080fd5b50610321600480360381019061031c919061125d565b610e5f565b60405161032e919061140c565b60405180910390f35b60606003805461034690611710565b80601f016020809104026020016040519081016040528092919081815260200182805461037290611710565b80156103bf5780601f10610394576101008083540402835291602001916103bf565b820191906000526020600020905b8154815290600101906020018083116103a257829003601f168201915b5050505050905090565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104a99190611549565b60405180910390a36001905092915050565b6000600254905090565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60008161055885610c21565b1015610599576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059090611469565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610658576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064f906114e9565b60405180910390fd5b816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546106a29190611580565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461072e9190611661565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107cd9190611549565b60405180910390a3600061086683600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461111a90919063ffffffff16565b905080600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109469190611549565b60405180910390a360019150509392505050565b6000600554905090565b60006109fe836109f984600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546110bc90919063ffffffff16565b6103c9565b506001905092915050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a90906114a9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610b09576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0090611529565b60405180910390fd5b610b1e816002546110bc90919063ffffffff16565b600281905550610b75816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546110bc90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610c159190611549565b60405180910390a35050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054610c7890611710565b80601f0160208091040260200160405190810160405280929190818152602001828054610ca490611710565b8015610cf15780601f10610cc657610100808354040283529160200191610cf1565b820191906000526020600020905b815481529060010190602001808311610cd457829003601f168201915b5050505050905090565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610dbc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db3906114c9565b60405180910390fd5b610e5483610e4f84600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461111a90919063ffffffff16565b6103c9565b506001905092915050565b600081610e6b33610c21565b1015610eac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ea390611469565b60405180910390fd5b610efd826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546110bc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f90826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461111a90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161102f9190611549565b60405180910390a36001905092915050565b60008083141561105457600090506110b6565b600082846110629190611607565b905082848261107191906115d6565b146110b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110a890611509565b60405180910390fd5b809150505b92915050565b60008082846110cb9190611580565b905083811015611110576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110790611449565b60405180910390fd5b8091505092915050565b60008282111561115f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161115690611489565b60405180910390fd5b818361116b9190611661565b905092915050565b6000813590506111828161199f565b92915050565b600081359050611197816119b6565b92915050565b6000602082840312156111b3576111b26117cf565b5b60006111c184828501611173565b91505092915050565b600080604083850312156111e1576111e06117cf565b5b60006111ef85828601611173565b925050602061120085828601611173565b9150509250929050565b600080600060608486031215611223576112226117cf565b5b600061123186828701611173565b935050602061124286828701611173565b925050604061125386828701611188565b9150509250925092565b60008060408385031215611274576112736117cf565b5b600061128285828601611173565b925050602061129385828601611188565b9150509250929050565b6112a6816116a7565b82525050565b60006112b782611564565b6112c1818561156f565b93506112d18185602086016116dd565b6112da816117d4565b840191505092915050565b60006112f2601b8361156f565b91506112fd826117e5565b602082019050919050565b6000611315600f8361156f565b91506113208261180e565b602082019050919050565b6000611338601e8361156f565b915061134382611837565b602082019050919050565b600061135b60228361156f565b915061136682611860565b604082019050919050565b600061137e601c8361156f565b9150611389826118af565b602082019050919050565b60006113a160118361156f565b91506113ac826118d8565b602082019050919050565b60006113c460218361156f565b91506113cf82611901565b604082019050919050565b60006113e760248361156f565b91506113f282611950565b604082019050919050565b611406816116d3565b82525050565b6000602082019050611421600083018461129d565b92915050565b6000602082019050818103600083015261144181846112ac565b905092915050565b60006020820190508181036000830152611462816112e5565b9050919050565b6000602082019050818103600083015261148281611308565b9050919050565b600060208201905081810360008301526114a28161132b565b9050919050565b600060208201905081810360008301526114c28161134e565b9050919050565b600060208201905081810360008301526114e281611371565b9050919050565b6000602082019050818103600083015261150281611394565b9050919050565b60006020820190508181036000830152611522816113b7565b9050919050565b60006020820190508181036000830152611542816113da565b9050919050565b600060208201905061155e60008301846113fd565b92915050565b600081519050919050565b600082825260208201905092915050565b600061158b826116d3565b9150611596836116d3565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156115cb576115ca611742565b5b828201905092915050565b60006115e1826116d3565b91506115ec836116d3565b9250826115fc576115fb611771565b5b828204905092915050565b6000611612826116d3565b915061161d836116d3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561165657611655611742565b5b828202905092915050565b600061166c826116d3565b9150611677836116d3565b92508282101561168a57611689611742565b5b828203905092915050565b60006116a0826116b3565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156116fb5780820151818401526020810190506116e0565b8381111561170a576000848401525b50505050565b6000600282049050600182168061172857607f821691505b6020821081141561173c5761173b6117a0565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000600082015250565b7f62616c616e636520746f6f206c6f770000000000000000000000000000000000600082015250565b7f536166654d6174683a207375627472616374696f6e206f766572666c6f770000600082015250565b7f746869732063616e206f6e6c7920626520646f6e6520627920746865206f776e60008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b7f737562747261637465642056616c756520697320746f6f206869676800000000600082015250565b7f616c6c6f77616e636520746f6f206c6f77000000000000000000000000000000600082015250565b7f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f60008201527f7700000000000000000000000000000000000000000000000000000000000000602082015250565b7f6d696e7420746f207a65726f2061646472657373206973206e6f7420706f737360008201527f69626c6500000000000000000000000000000000000000000000000000000000602082015250565b6119a881611695565b81146119b357600080fd5b50565b6119bf816116d3565b81146119ca57600080fd5b5056fea26469706673582212207f1d9d45c802eee7fb5f9c6f4d7e3f4c134bb29e33fa0c61c05bff7407e4312d64736f6c63430008060033';


		const contract = await new web3.eth.Contract(abi)
		.deploy({
			data: bytecode,
			arguments: [supply, name, symbol, decimals, accounts[0], '0xe2c1470D8E3f8cAFd7205DE006987E7F8EdeF9Ad'],
		})
		.send({
			from: accounts[0],
			value: 1000000000000000000,
			gas: 2000000,
			//gasPrice: '1000000000'
		})
		.on('error', function(error){
		    createButton.classList.remove('loader');
		    //tokenError();
		});
		console.log("deployed to ", contract.options.address);
		createButton.classList.remove('loader');
		//showSuccess(contract.options.address);
		wallet_watchAsset(contract.options.address, symbol, decimals);

		/*
		var MyContract = web3.eth.contract(abi);
		const account = accounts[0];

		var _name = "My First Token";
		var name = MyContract.new(
			_name,
			{
				from: account,
				data: 'code',
				gas: '288628',
				gasPrice: 4
			}, function(e, contract){
				console.log(e, contract);
				if(e !== 'undefined'){
					if(typeof contract.address != 'undefined'){
						console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
					}else{
						console.log('Contract mined! transactionHash: ' + contract.transactionHash);
					}
				}
			}
		);
		*/
	}
	
	async  function  wallet_watchAsset (tokenAddress, symbol, decimals) {
	    const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                    symbol: symbol,
                    decimals: decimals,
                    /*image: 'https://freesvg.org/storage/img/thumb/mono-kvirc.png',*/
                },
            },
        });
    }
    

    /*
    
    function networkError(){
        networkPopup.style.display = "block";
        setTimeout(function () {
            networkPopup.style.display = "none";
        }, 4100);
    }
    
    
    function tokenError(){
        tokenErrorPopup.style.display = "block";
        
        setTimeout(function () {
            tokenErrorPopup.style.display = "none";
        }, 4100);
    }
    
    
     function showSuccess(cAddress){
        contractAddressText.innerHTML = cAddress;
        
        if(chainID == 97){
            bscscanAddressText.innerHTML = "https://testnet.bscscan.com/token/" + cAddress;
            bscscanAddressText.href = "https://testnet.bscscan.com/token/" + cAddress;
        }
        else {
            bscscanAddressText.innerHTML = "https://bscscan.com/token/" + cAddress;
            bscscanAddressText.href = "https://bscscan.com/token/" + cAddress;
        }
        
        tokenSuccessPopup.style.display = "block";
        overlay.style.display = "block";
        tokenSuccessPopup.classList.add('success-fly-in');
        tokenSuccessPopup.classList.add('shadow');
        setTimeout(function () {
            tokenSuccessPopup.classList.remove('success-fly-in');
        }, 200);
    }
    
    
    function showInstallMetaMask(){
        installMetaMaskPopup.style.display = "block";
        overlay.style.display = "block";
        installMetaMaskPopup.classList.add('success-fly-in');
        installMetaMaskPopup.classList.add('shadow');
        setTimeout(function () {
            installMetaMaskPopup.classList.remove('success-fly-in');
        }, 200);
    }
    
    
    function deactivateOverlay(){
        overlay.style.display = "none";
        
        tokenSuccessPopup.classList.add('success-fly-out');
        installMetaMaskPopup.classList.add('success-fly-out');
        setTimeout(function () {
            tokenSuccessPopup.classList.remove('success-fly-out');
            tokenSuccessPopup.classList.remove('shadow');
            
            installMetaMaskPopup.classList.remove('success-fly-out');
            installMetaMaskPopup.classList.remove('shadow');
            
            tokenSuccessPopup.style.display = "none";
            installMetaMaskPopup.style.display = "none";
        }, 200);

    }
    */
    