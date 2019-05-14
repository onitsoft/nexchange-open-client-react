import { validateWalletAddress } from 'Utils/walletAddress';

describe('Validate coin address', () => {
  it('validates valid BTC address', () => {
    expect(validateWalletAddress('1C394PrnPG1bw3r7ERJS1pbauRbtf1Kxcx', 'BTC')).toEqual(true);
  });

  it('invalidates invalid BTC address', () => {
    expect(validateWalletAddress('random address', 'BTC')).toEqual(false);
  });

  it('validates valid LTC address', () => {
    expect(validateWalletAddress('LKJNbqWg49qQJtPuBDJLEUz4f4Jm4fttZ4', 'LTC')).toEqual(true);
  });

  it('invalidates invalid LTC address', () => {
    expect(validateWalletAddress('random address', 'LTC')).toEqual(false);
  });

  it('validates valid ETH and ERC20 tokens addresses', () => {
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'ETH')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'EOS')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'BDG')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'GNT')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'OMG')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'QTM')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'BAT')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'REP')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'BNB')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'KCS')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'KNC')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'HT')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'BNT')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'BIX')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'COB')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'COSS')).toEqual(true);
    expect(validateWalletAddress('0x5B93162D7A375323964Acdca69705981a7643cBE', 'BMH')).toEqual(true);
  });

  it('invalidates invalid ETH and ERC20 tokens address', () => {
    expect(validateWalletAddress('random address', 'ETH')).toEqual(false);
    expect(validateWalletAddress('random address', 'EOS')).toEqual(false);
    expect(validateWalletAddress('random address', 'BDG')).toEqual(false);
    expect(validateWalletAddress('random address', 'GNT')).toEqual(false);
    expect(validateWalletAddress('random address', 'OMG')).toEqual(false);
    expect(validateWalletAddress('random address', 'QTM')).toEqual(false);
    expect(validateWalletAddress('random address', 'BAT')).toEqual(false);
    expect(validateWalletAddress('random address', 'REP')).toEqual(false);
    expect(validateWalletAddress('random address', 'BNB')).toEqual(false);
    expect(validateWalletAddress('random address', 'KCS')).toEqual(false);
    expect(validateWalletAddress('random address', 'KNC')).toEqual(false);
    expect(validateWalletAddress('random address', 'HT')).toEqual(false);
    expect(validateWalletAddress('random address', 'BNT')).toEqual(false);
    expect(validateWalletAddress('random address', 'BIX')).toEqual(false);
    expect(validateWalletAddress('random address', 'COB')).toEqual(false);
    expect(validateWalletAddress('random address', 'COSS')).toEqual(false);
    expect(validateWalletAddress('random address', 'BMH')).toEqual(false);
  });

  it('validates valid DOGE address', () => {
    expect(validateWalletAddress('D9Sm7iavFzbCbRKRVBVDHrqgA9XHjcNvBE', 'DOGE')).toEqual(true);
  });

  it('invalidates invalid DOGE address', () => {
    expect(validateWalletAddress('random address', 'DOGE')).toEqual(false);
  });

  it('validates valid XVG address', () => {
    expect(validateWalletAddress('DLCw22a8B8Roetqp2t2q7zop8SYZp9wY5E', 'XVG')).toEqual(true);
  });

  it('invalidates invalid XVG address', () => {
    expect(validateWalletAddress('random address', 'XVG')).toEqual(false);
  });

  it('validates valid BCH address', () => {
    expect(validateWalletAddress('1C394PrnPG1bw3r7ERJS1pbauRbtf1Kxcx', 'BCH')).toEqual(true);
    expect(validateWalletAddress('bitcoincash:qzgge698e7vhdyutsk7qhrh60dth2ewqdqm484uf26', 'BCH')).toEqual(true);
  });

  it('invalidates invalid BCH address', () => {
    expect(validateWalletAddress('random address', 'BCH')).toEqual(false);
  });

  it('validates valid NANO address', () => {
    expect(validateWalletAddress('xrb_1nanode8ngaakzbck8smq6ru9bethqwyehomf79sae1k7xd47dkidjqzffeg', 'NANO')).toEqual(true);
  });

  it('invalidates invalid NANO address', () => {
    expect(validateWalletAddress('random address', 'NANO')).toEqual(false);
  });

  it('validates valid ZEC address', () => {
    expect(validateWalletAddress('t1TQr7VnRK524FmUNtjcpFLpGzsmyrRXcJm', 'ZEC')).toEqual(true);
  });

  it('invalidates invalid ZEC address', () => {
    expect(validateWalletAddress('random address', 'ZEC')).toEqual(false);
  });

  it('validates valid USDT address', () => {
    expect(validateWalletAddress('1Ee8D4v8mXLB73zozR6umsykZ9V5RpHsmo', 'USDT')).toEqual(true);
  });

  it('invalidates invalid USDT address', () => {
    expect(validateWalletAddress('random address', 'USDT')).toEqual(false);
  });

  it('validates valid XMR address', () => {
    expect(
      validateWalletAddress('47YGvYSSnxMFRJyptAw5B1BLsfrCdA7172hVCP8mQNaNimSMYvcKoRQXXY9MFYQZ3pVGnKnQhFRrUXxSt5nZar4T5ERVa86', 'XMR')
    ).toEqual(true);
  });

  it('invalidates invalid XMR address', () => {
    expect(validateWalletAddress('random address', 'XMR')).toEqual(false);
  });

  it('success callback is called', () => {
    const errorCb = jest.fn();
    const successCb = jest.fn();

    validateWalletAddress('1Ee8D4v8mXLB73zozR6umsykZ9V5RpHsmo', 'USDT', errorCb, successCb);

    expect(successCb).toHaveBeenCalledTimes(1);
    expect(errorCb).toHaveBeenCalledTimes(0);
  });

  it('error callback is called', () => {
    const errorCb = jest.fn();
    const successCb = jest.fn();

    validateWalletAddress('random address', 'USDT', errorCb, successCb);

    expect(successCb).toHaveBeenCalledTimes(0);
    expect(errorCb).toHaveBeenCalledTimes(1);
  });
});
