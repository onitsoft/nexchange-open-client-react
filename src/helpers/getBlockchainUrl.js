export default (coin, txId) => {
  if (
    ['ETH', 'EOS', 'BDG', 'GNT', 'OMG', 'QTM', 'BAT', 'REP'].indexOf(coin) > -1
  )
    return (this.blockchainUrl = `https://etherscan.io/tx/${txId}`);
  else if (coin === 'LTC')
    return (this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${txId}/`);
  else if (coin === 'BTC')
    return (this.blockchainUrl = `https://blockchain.info/tx/${txId}`);
  else if (coin === 'DOGE')
    return (this.blockchainUrl = `https://dogechain.info/tx/${txId}`);
  else if (coin === 'XVG')
    return (this.blockchainUrl = `https://verge-blockchain.info/tx/${txId}`);
  else if (coin === 'BCH')
    return (this.blockchainUrl = `https://blockchair.com/bitcoin-cash/transaction/${txId}`);
  else if (coin === 'NANO')
    return (this.blockchainUrl = `https://www.raiblocks.club/block/${txId}`);
  else if (coin === 'ZEC')
    return (this.blockchainUrl = `https://explorer.zcha.in/transactions/${txId}`);
  else if (coin === 'USDT')
    return (this.blockchainUrl = `https://omniexplorer.info/tx/${txId}`);

  return null;
};
