const rules = {
  BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
  LTC: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/,
  ETH: /^0x[0-9a-fA-F]{40}$/,
  EOS: /^0x[0-9a-fA-F]{40}$/,
  BDG: /^0x[0-9a-fA-F]{40}$/,
  GNT: /^0x[0-9a-fA-F]{40}$/,
  OMG: /^0x[0-9a-fA-F]{40}$/,
  QTM: /^0x[0-9a-fA-F]{40}$/,
  BAT: /^0x[0-9a-fA-F]{40}$/,
  REP: /^0x[0-9a-fA-F]{40}$/,
  BNB: /^0x[0-9a-fA-F]{40}$/,
  KCS: /^0x[0-9a-fA-F]{40}$/,
  KNC: /^0x[0-9a-fA-F]{40}$/,
  HT: /^0x[0-9a-fA-F]{40}$/,
  BNT: /^0x[0-9a-fA-F]{40}$/,
  BIX: /^0x[0-9a-fA-F]{40}$/,
  COB: /^0x[0-9a-fA-F]{40}$/,
  COSS: /^0x[0-9a-fA-F]{40}$/,
  BMH: /^0x[0-9a-fA-F]{40}$/,
  DOGE: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
  XVG: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
  BCH: [/^([13][a-km-zA-HJ-NP-Z1-9]{25,34})$/, /^((bitcoincash:)?(q|p)[a-z0-9]{41})$/],
  NANO: /^xrb_[1|3][a-zA-Z\d]{59}$/,
  ZEC: /^t[1-9A-Za-z]{34}$/,
  USDT: /^1[1-9A-Za-z]{33}$/,
  XMR: /^[4|8][0-9a-zA-Z]{94}$/,
  XRP: /^r[1-9A-Za-z][^lO0I]{25,34}$/,
  XLM: /^G[1-9A-Z]{55}$/,
  DASH: /^X[1-9A-HJ-NP-Za-km-z]{33}/,
  NEO: /A[0-9a-zA-Z]{33}/,
};

 const validateWalletAddress = (address, coin, errorCb, successCb) => {

  const coinRules = rules[coin];
  let isValid = true;

  if (Array.isArray(coinRules)) {
    for (const coinRule of coinRules) {
      isValid = coinRule.test(address);

      if (isValid) {
        break;
      }
    }
  } else {
    isValid = coinRules.test(address);
  }

  if (!isValid && errorCb) {
    errorCb();
  } else if (successCb) {
    successCb();
  }

  return isValid;
};


const getMatchingCoins = (address) => {
  const matchingCoins = [];

  for (const coin in rules) {
    if (rules.hasOwnProperty(coin)) {
      const coinRules = rules[coin];
      let isValid = false;

      if (Array.isArray(coinRules)) {
        for (const coinRule of coinRules) {
          isValid = coinRule.test(address);
    
          if (isValid) {
            break;
          }
        }
      } else {
        isValid = coinRules.test(address);
      }
      if(isValid){
        matchingCoins.push(coin);
      }
    } 
  }

  return matchingCoins;
};

export { validateWalletAddress, getMatchingCoins }