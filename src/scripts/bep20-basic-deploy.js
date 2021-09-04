    
    var networkPopup = document.querySelector('.Network-Popup');
    var tokenErrorPopup = document.querySelector('.TokenErrorPopup');
    var tokenSuccessPopup = document.querySelector('.TokenSuccessPopup');
    var installMetaMaskPopup = document.querySelector('.installMetaMaskPopup');
    var contractAddressText = document.querySelector('.contractAddress');
    var bscscanAddressText = document.querySelector('.bscscanAddress');
    var overlay = document.querySelector('.backgroundOverlay');
    

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
	/*showSuccess(13);*/
});
	
	function beforeDeployCheck(name, symbol, supply, decimals){
		if(typeof window.ethereum !== 'undefined') {
		    checkNetworkConnection(name, symbol, supply, decimals);
		}else{
		    createButton.classList.remove('loader');
			showInstallMetaMask();
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
	            networkError();
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

		const bytecode = '0x6080604052604051620023553803806200235583398181016040528101906200002991906200052e565b6200005183600a6200003c919062000871565b876200016a60201b62000df51790919060201c565b60028190555084600390805190602001906200006f929190620003d2565b50836004908051906020019062000088929190620003d2565b508260058190555081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000107600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254620001ee60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff166108fc620001316200036760201b60201c565b9081150290604051600060405180830381858888f193505050501580156200015d573d6000803e3d6000fd5b5050505050505062000cb2565b6000808314156200017f5760009050620001e8565b600082846200018f9190620009ae565b9050828482620001a09190620007de565b14620001e3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001da90620006b0565b60405180910390fd5b809150505b92915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000261576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200025890620006d2565b60405180910390fd5b620002b9816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200036f60201b62000e701790919060201c565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200035b9190620006f4565b60405180910390a35050565b600047905090565b600080828462000380919062000781565b905083811015620003c8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003bf906200068e565b60405180910390fd5b8091505092915050565b828054620003e09062000a83565b90600052602060002090601f01602090048101928262000404576000855562000450565b82601f106200041f57805160ff191683800117855562000450565b8280016001018555821562000450579182015b828111156200044f57825182559160200191906001019062000432565b5b5090506200045f919062000463565b5090565b5b808211156200047e57600081600090555060010162000464565b5090565b60006200049962000493846200073a565b62000711565b905082815260208101848484011115620004b857620004b762000bb0565b5b620004c584828562000a4d565b509392505050565b600081519050620004de8162000c7e565b92915050565b600082601f830112620004fc57620004fb62000bab565b5b81516200050e84826020860162000482565b91505092915050565b600081519050620005288162000c98565b92915050565b60008060008060008060c087890312156200054e576200054d62000bba565b5b60006200055e89828a0162000517565b965050602087015167ffffffffffffffff81111562000582576200058162000bb5565b5b6200059089828a01620004e4565b955050604087015167ffffffffffffffff811115620005b457620005b362000bb5565b5b620005c289828a01620004e4565b9450506060620005d589828a0162000517565b9350506080620005e889828a01620004cd565b92505060a0620005fb89828a01620004cd565b9150509295509295509295565b600062000617601b8362000770565b9150620006248262000bdd565b602082019050919050565b60006200063e60218362000770565b91506200064b8262000c06565b604082019050919050565b600062000665601f8362000770565b9150620006728262000c55565b602082019050919050565b620006888162000a43565b82525050565b60006020820190508181036000830152620006a98162000608565b9050919050565b60006020820190508181036000830152620006cb816200062f565b9050919050565b60006020820190508181036000830152620006ed8162000656565b9050919050565b60006020820190506200070b60008301846200067d565b92915050565b60006200071d62000730565b90506200072b828262000ab9565b919050565b6000604051905090565b600067ffffffffffffffff82111562000758576200075762000b7c565b5b620007638262000bbf565b9050602081019050919050565b600082825260208201905092915050565b60006200078e8262000a43565b91506200079b8362000a43565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620007d357620007d262000aef565b5b828201905092915050565b6000620007eb8262000a43565b9150620007f88362000a43565b9250826200080b576200080a62000b1e565b5b828204905092915050565b6000808291508390505b6001851115620008685780860481111562000840576200083f62000aef565b5b6001851615620008505780820291505b8081029050620008608562000bd0565b945062000820565b94509492505050565b60006200087e8262000a43565b91506200088b8362000a43565b9250620008ba7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484620008c2565b905092915050565b600082620008d45760019050620009a7565b81620008e45760009050620009a7565b8160018114620008fd576002811462000908576200093e565b6001915050620009a7565b60ff8411156200091d576200091c62000aef565b5b8360020a91508482111562000937576200093662000aef565b5b50620009a7565b5060208310610133831016604e8410600b8410161715620009785782820a90508381111562000972576200097162000aef565b5b620009a7565b62000987848484600162000816565b92509050818404811115620009a157620009a062000aef565b5b81810290505b9392505050565b6000620009bb8262000a43565b9150620009c88362000a43565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161562000a045762000a0362000aef565b5b828202905092915050565b600062000a1c8262000a23565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000a6d57808201518184015260208101905062000a50565b8381111562000a7d576000848401525b50505050565b6000600282049050600182168062000a9c57607f821691505b6020821081141562000ab35762000ab262000b4d565b5b50919050565b62000ac48262000bbf565b810181811067ffffffffffffffff8211171562000ae65762000ae562000b7c565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160011c9050919050565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000600082015250565b7f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f60008201527f7700000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b62000c898162000a0f565b811462000c9557600080fd5b50565b62000ca38162000a43565b811462000caf57600080fd5b50565b6116938062000cc26000396000f3fe6080604052600436106100a05760003560e01c8063313ce56711610064578063313ce567146101b957806339509351146101e457806370a082311461022157806395d89b411461025e578063a457c2d714610289578063a9059cbb146102c6576100a7565b806306fdde03146100ac578063095ea7b3146100d757806318160ddd146101145780631a46ec821461013f57806323b872dd1461017c576100a7565b366100a757005b600080fd5b3480156100b857600080fd5b506100c1610303565b6040516100ce9190611195565b60405180910390f35b3480156100e357600080fd5b506100fe60048036038101906100f99190611011565b610395565b60405161010b919061117a565b60405180910390f35b34801561012057600080fd5b50610129610487565b6040516101369190611277565b60405180910390f35b34801561014b57600080fd5b5061016660048036038101906101619190610f7e565b610491565b6040516101739190611277565b60405180910390f35b34801561018857600080fd5b506101a3600480360381019061019e9190610fbe565b610518565b6040516101b0919061117a565b60405180910390f35b3480156101c557600080fd5b506101ce610926565b6040516101db9190611277565b60405180910390f35b3480156101f057600080fd5b5061020b60048036038101906102069190611011565b610930565b604051610218919061117a565b60405180910390f35b34801561022d57600080fd5b5061024860048036038101906102439190610f51565b6109d5565b6040516102559190611277565b60405180910390f35b34801561026a57600080fd5b50610273610a1d565b6040516102809190611195565b60405180910390f35b34801561029557600080fd5b506102b060048036038101906102ab9190611011565b610aaf565b6040516102bd919061117a565b60405180910390f35b3480156102d257600080fd5b506102ed60048036038101906102e89190611011565b610c13565b6040516102fa919061117a565b60405180910390f35b6060600380546103129061143e565b80601f016020809104026020016040519081016040528092919081815260200182805461033e9061143e565b801561038b5780601f106103605761010080835404028352916020019161038b565b820191906000526020600020905b81548152906001019060200180831161036e57829003601f168201915b5050505050905090565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104759190611277565b60405180910390a36001905092915050565b6000600254905090565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081610524856109d5565b1015610565576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055c906111d7565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610624576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061b90611237565b60405180910390fd5b816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461066e91906112ae565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546106fa919061138f565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107999190611277565b60405180910390a3600061083283600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ece90919063ffffffff16565b905080600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109129190611277565b60405180910390a360019150509392505050565b6000600554905090565b60006109ca836109c584600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e7090919063ffffffff16565b610395565b506001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054610a2c9061143e565b80601f0160208091040260200160405190810160405280929190818152602001828054610a589061143e565b8015610aa55780601f10610a7a57610100808354040283529160200191610aa5565b820191906000526020600020905b815481529060010190602001808311610a8857829003601f168201915b5050505050905090565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610b70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6790611217565b60405180910390fd5b610c0883610c0384600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ece90919063ffffffff16565b610395565b506001905092915050565b600081610c1f336109d5565b1015610c60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c57906111d7565b60405180910390fd5b610cb1826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e7090919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d44826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ece90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610de39190611277565b60405180910390a36001905092915050565b600080831415610e085760009050610e6a565b60008284610e169190611335565b9050828482610e259190611304565b14610e65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5c90611257565b60405180910390fd5b809150505b92915050565b6000808284610e7f91906112ae565b905083811015610ec4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ebb906111b7565b60405180910390fd5b8091505092915050565b600082821115610f13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0a906111f7565b60405180910390fd5b8183610f1f919061138f565b905092915050565b600081359050610f368161162f565b92915050565b600081359050610f4b81611646565b92915050565b600060208284031215610f6757610f666114fd565b5b6000610f7584828501610f27565b91505092915050565b60008060408385031215610f9557610f946114fd565b5b6000610fa385828601610f27565b9250506020610fb485828601610f27565b9150509250929050565b600080600060608486031215610fd757610fd66114fd565b5b6000610fe586828701610f27565b9350506020610ff686828701610f27565b925050604061100786828701610f3c565b9150509250925092565b60008060408385031215611028576110276114fd565b5b600061103685828601610f27565b925050602061104785828601610f3c565b9150509250929050565b61105a816113d5565b82525050565b600061106b82611292565b611075818561129d565b935061108581856020860161140b565b61108e81611502565b840191505092915050565b60006110a6601b8361129d565b91506110b182611513565b602082019050919050565b60006110c9600f8361129d565b91506110d48261153c565b602082019050919050565b60006110ec601e8361129d565b91506110f782611565565b602082019050919050565b600061110f601c8361129d565b915061111a8261158e565b602082019050919050565b600061113260118361129d565b915061113d826115b7565b602082019050919050565b600061115560218361129d565b9150611160826115e0565b604082019050919050565b61117481611401565b82525050565b600060208201905061118f6000830184611051565b92915050565b600060208201905081810360008301526111af8184611060565b905092915050565b600060208201905081810360008301526111d081611099565b9050919050565b600060208201905081810360008301526111f0816110bc565b9050919050565b60006020820190508181036000830152611210816110df565b9050919050565b6000602082019050818103600083015261123081611102565b9050919050565b6000602082019050818103600083015261125081611125565b9050919050565b6000602082019050818103600083015261127081611148565b9050919050565b600060208201905061128c600083018461116b565b92915050565b600081519050919050565b600082825260208201905092915050565b60006112b982611401565b91506112c483611401565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156112f9576112f8611470565b5b828201905092915050565b600061130f82611401565b915061131a83611401565b92508261132a5761132961149f565b5b828204905092915050565b600061134082611401565b915061134b83611401565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561138457611383611470565b5b828202905092915050565b600061139a82611401565b91506113a583611401565b9250828210156113b8576113b7611470565b5b828203905092915050565b60006113ce826113e1565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101561142957808201518184015260208101905061140e565b83811115611438576000848401525b50505050565b6000600282049050600182168061145657607f821691505b6020821081141561146a576114696114ce565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000600082015250565b7f62616c616e636520746f6f206c6f770000000000000000000000000000000000600082015250565b7f536166654d6174683a207375627472616374696f6e206f766572666c6f770000600082015250565b7f737562747261637465642056616c756520697320746f6f206869676800000000600082015250565b7f616c6c6f77616e636520746f6f206c6f77000000000000000000000000000000600082015250565b7f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f60008201527f7700000000000000000000000000000000000000000000000000000000000000602082015250565b611638816113c3565b811461164357600080fd5b50565b61164f81611401565b811461165a57600080fd5b5056fea2646970667358221220f895b52787460283b4064647902552d20b2f5983bdedfff1f0f61b5a000e93d664736f6c63430008060033';


		const contract = await new web3.eth.Contract(abi)
		.deploy({
			data: bytecode,
			arguments: [supply, name, symbol, decimals, accounts[0], '0xe2c1470D8E3f8cAFd7205DE006987E7F8EdeF9Ad'],
		})
		.send({
			from: accounts[0],
			value: 700000000000000000,
			gas: 1500000,
			//gasPrice: '1000000000'
		})
		.on('error', function(error){
		    createButton.classList.remove('loader');
		    tokenError();
		});
		console.log("deployed to ", contract.options.address);
		createButton.classList.remove('loader');
		showSuccess(contract.options.address);
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
    
