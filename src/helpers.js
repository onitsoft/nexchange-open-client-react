
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
		if (['ETH', 'EOS', 'BDG', 'GNT', 'OMG', 'QTM', 'BAT', 'REP'].indexOf(coin) > -1) return this.blockchainUrl = `https://etherscan.io/tx/${txId}`;
		else if (coin === 'LTC') return this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${txId}/`;
		else if (coin === 'BTC') return this.blockchainUrl = `https://blockchain.info/tx/${txId}`;
		else if (coin === 'DOGE') return this.blockchainUrl = `https://dogechain.info/tx/${txId}`;
		else if (coin === 'XVG') return this.blockchainUrl = `https://verge-blockchain.info/tx/${txId}`;
		else if (coin === 'BCH') return this.blockchainUrl = `https://blockchair.com/bitcoin-cash/transaction/${txId}`;
    	else if (coin === 'NANO') return this.blockchainUrl = `https://www.raiblocks.club/block/${txId}`;

		return null;
	}
}

export default Helpers;
