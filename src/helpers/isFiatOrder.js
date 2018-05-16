export default order => {
  return !order.pair.quote.is_crypto;
};
