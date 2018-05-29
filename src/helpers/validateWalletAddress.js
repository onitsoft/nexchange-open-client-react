export default (address, coin, errorCb, successCb) => {
  let rules = {
    BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
    LTC: /^L[1-9A-Za-z]{25,34}$/,
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
    DOGE: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
    XVG: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
    BCH: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
    NANO: /^xrb\_[1|3][a-zA-Z\d]{59}$/,
    ZEC: /^t[1-9A-Za-z]{34}$/,
    USDT: /^1[1-9A-Za-z]{33}$/,
    XMR: /^[4|8][0-9a-zA-Z]{94}$/,
  };

  let isValid = rules[coin].test(address);

  if (!isValid && errorCb) {
    errorCb();
  } else if (successCb) {
    successCb();
  }

  return isValid;
};
