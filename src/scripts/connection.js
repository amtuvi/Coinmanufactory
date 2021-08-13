const NAME = "once";
	
	//var metaMaskPopup = document.querySelector('.installMetaMaskPopup');
	//var overlaymetMask = document.querySelector('.backgroundOverlay');
	
	window.onload = function(){
		checkConnection();
	}
	
	async function checkConnection(){
		//var web3;
		if(typeof window.ethereum !== 'undefined') {
			if(this.name !== NAME) {
				console.log(this.name);
        		this.name = NAME;
				connectAccount();
    		}
            /*
			web3 = new Web3(window.ethereum);
			
			const accounts = await web3.eth.getAccounts();*/
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			if(accounts[0] != null){
				var width = window.innerWidth;
				if(width > 921){
					document.getElementsByClassName('connect-button')[0].style.background='#4b85ff';
					document.getElementsByClassName('connect-button')[0].style.color='#FFFFFF';
					document.getElementsByClassName('connect-button')[0].innerHTML='Connected';
				}
				else{
					document.getElementsByClassName('connect-button')[1].style.background='#4b85ff';
					document.getElementsByClassName('connect-button')[1].style.color='#FFFFFF';
					document.getElementsByClassName('connect-button')[1].innerHTML='Connected';
				}
			}
			checkStillConnected();
		}
	}
	
	
	function connect(){
		if(typeof window.ethereum !== 'undefined') {
				connectAccount();
		}
		else{
			//showMetaMask();
		}
	}
	
	
	async function connectAccount(){
		//const web3 = new Web3(window.ethereum);
		const accounts = await ethereum.request({method: 'eth_requestAccounts'});
	
		if(accounts[0] != null){
			var width = window.innerWidth;
				if(width > 921){
					document.getElementsByClassName('connect-button')[0].style.background='#4b85ff';
					document.getElementsByClassName('connect-button')[0].style.color='#FFFFFF';
					document.getElementsByClassName('connect-button')[0].innerHTML='Connected';
				}
				else{
					document.getElementsByClassName('connect-button')[1].style.background='#4b85ff';
					document.getElementsByClassName('connect-button')[1].style.color='#FFFFFF';
					document.getElementsByClassName('connect-button')[1].innerHTML='Connected';
				}
		}
		
		
	}
	
	async function checkStillConnected(){
    	window.ethereum.on('accountsChanged', async function () {
            /*
			const web3 = new Web3(window.ethereum);
       	 	const accounts = web3.eth.getAccounts();*/
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			if(accounts[0] == null){
				var width = window.innerWidth;
				if(width > 921){
					document.getElementsByClassName('connect-button')[0].style.background='transparent';
					document.getElementsByClassName('connect-button')[0].style.color='#4b85ff';
					document.getElementsByClassName('connect-button')[0].innerHTML='Connect';
				}
				else{
					document.getElementsByClassName('connect-button')[1].style.background='transparent';
					document.getElementsByClassName('connect-button')[1].style.color='#4b85ff';
					document.getElementsByClassName('connect-button')[1].innerHTML='Connect';
				}
			}
    	});
	}
	
	/*
	function showMetaMask(){
        metaMaskPopup.style.display = "block";
        overlaymetMask.style.display = "block";
        metaMaskPopup.classList.add('success-fly-in');
        metaMaskPopup.classList.add('shadow');
        setTimeout(function () {
            metaMaskPopup.classList.remove('success-fly-in');
        }, 200);
    }
    
    
    function deactivateMetMask(){
        overlaymetMask.style.display = "none";
        
        metaMaskPopup.classList.add('success-fly-out');
        setTimeout(function () {
            
            metaMaskPopup.classList.remove('success-fly-out');
            metaMaskPopup.classList.remove('shadow');
            
            metaMaskPopup.style.display = "none";
        }, 200);

    }
    */
