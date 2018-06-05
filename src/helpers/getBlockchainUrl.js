export default (coin, txId) => {
  if (['ETH', 'EOS', 'BDG', 'GNT', 'OMG', 'QTM', 'BAT', 'REP', 'BNB', 'KCS', 'KNC', 'HT', 'BNT', 'BIX', 'COB', 'COSS'].indexOf(coin) > -1)
    return `https://etherscan.io/tx/${txId}`;
  else if (coin === 'LTC') return `https://live.blockcypher.com/ltc/tx/${txId}/`;
  else if (coin === 'BTC') return `https://blockchain.info/tx/${txId}`;
  else if (coin === 'DOGE') return `https://dogechain.info/tx/${txId}`;
  else if (coin === 'XVG') return `https://verge-blockchain.info/tx/${txId}`;
  else if (coin === 'BCH') return `https://blockchair.com/bitcoin-cash/transaction/${txId}`;
  else if (coin === 'NANO') return `https://www.raiblocks.club/block/${txId}`;
  else if (coin === 'ZEC') return `https://explorer.zcha.in/transactions/${txId}`;
  else if (coin === 'USDT') return `https://omniexplorer.info/tx/${txId}`;
  else if (coin === 'XMR') return `https://moneroexplorer.com/tx/${txId}`;

  return null;
};
