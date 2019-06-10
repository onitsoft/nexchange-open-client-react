export default data => {
  let pairs = {};
  for (let pair of data) {
    if (!pair.disabled) {
      if (!pairs[pair.quote]) pairs[pair.quote] = {};
      pairs[pair.quote][pair.base] = {};
      pairs[pair.quote][pair.base].enabled = !pair.disabled; 
      pairs[pair.quote][pair.base].orderbook_enabled = pair.orderbook_enabled;
      pairs[pair.quote][pair.base].reverse_orderbook_enabled = pair.reverse_orderbook_enabled;
    }
  }
  return pairs;
};
