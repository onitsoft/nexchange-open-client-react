import getBlockchainUrl from 'Utils/getBlockchainUrl';

describe('Prepare pairs', () => {
  it('returns correct ERC20 and ETH blockchain urls', () => {
    expect(getBlockchainUrl('ETH', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('EOS', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('BDG', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('GNT', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('OMG', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('QTM', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('BAT', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('REP', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('BNB', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('KCS', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('KNC', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('HT', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('BNT', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('BIX', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('COB', '123')).toBe('https://etherscan.io/tx/123');
    expect(getBlockchainUrl('COSS', '123')).toBe('https://etherscan.io/tx/123');
  });

  it('returns correct LTC url', () => {
    expect(getBlockchainUrl('LTC', '123')).toBe('https://live.blockcypher.com/ltc/tx/123/');
  });

  it('returns correct BTC url', () => {
    expect(getBlockchainUrl('BTC', '123')).toBe('https://blockchain.info/tx/123');
  });

  it('returns correct DOGE url', () => {
    expect(getBlockchainUrl('DOGE', '123')).toBe('https://dogechain.info/tx/123');
  });

  it('returns correct XVG url', () => {
    expect(getBlockchainUrl('XVG', '123')).toBe('https://verge-blockchain.info/tx/123');
  });

  it('returns correct BCH url', () => {
    expect(getBlockchainUrl('BCH', '123')).toBe('https://blockchair.com/bitcoin-cash/transaction/123');
  });

  it('returns correct NANO url', () => {
    expect(getBlockchainUrl('NANO', '123')).toBe('https://www.raiblocks.club/block/123');
  });

  it('returns correct ZEC url', () => {
    expect(getBlockchainUrl('ZEC', '123')).toBe('https://explorer.zcha.in/transactions/123');
  });

  it('returns correct USDT url', () => {
    expect(getBlockchainUrl('USDT', '123')).toBe('https://omniexplorer.info/tx/123');
  });

  it('returns correct XMR url', () => {
    expect(getBlockchainUrl('XMR', '123')).toBe('https://moneroexplorer.com/tx/123');
  });

  it('returns null for invalid coin', () => {
    expect(getBlockchainUrl('RANDOM', '123')).toBe(null);
  });
});
