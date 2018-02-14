
class Helpers {
	static urlParams() {
		let url = window.location.search.substring(1),
			params = url.split('&'),
			obj = {};

		if (params[0] == '') return null;

		for (let i = 0; i < params.length; i++) {
			let param = params[i].split('=');
			obj[param[0]] = param[1];
		}

		return obj;
	}

	static getBlockchainUrl(coin, txId) {
		if (coin === 'ETH') return this.blockchainUrl = `https://etherscan.io/tx/${txId}`;
		else if (coin === 'EOS') return this.blockchainUrl = `https://etherscan.io/tx/${txId}`;
		else if (coin === 'BDG') return this.blockchainUrl = `https://etherscan.io/tx/${txId}`;
		else if (coin === 'LTC') return this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${txId}/`;
		else if (coin === 'BTC') return this.blockchainUrl = `https://blockchain.info/tx/${txId}`;
		else if (coin === 'DOGE') return this.blockchainUrl = `https://dogechain.info/tx/${txId}`;
		else if (coin === 'XVG') return this.blockchainUrl = `https://verge-blockchain.info/tx/${txId}`;
		else if (coin === 'BCH') return this.blockchainUrl = `https://blockchair.com/bitcoin-cash/transaction/${txId}`;
    else if (coin === 'XRB') return this.blockchainUrl = `https://www.raiblocks.club/block/${txId}`;

		return null;
	}

	static validateWalletAddress(address, coin, errorCb, successCb) {
    let rules = {
        BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
        LTC: /^L[1-9A-Za-z]{25,34}$/,
        ETH: /^0x[0-9a-fA-F]{40}$/,
        EOS: /^0x[0-9a-fA-F]{40}$/,
        BDG: /^0x[0-9a-fA-F]{40}$/,
        DOGE: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
        XVG: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
        BCH: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
        XRB: /^xrb_[13][0-9a-fA-F]{59}$/
    };

    let isValid = rules[coin].test(address);

    if (!isValid)
    	errorCb();
    else
    	successCb();

    return isValid;
  }
}

export default Helpers;
