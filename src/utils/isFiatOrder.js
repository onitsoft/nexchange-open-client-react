export default order => {
  return order && order.pair && order.pair.quote && !order.pair.quote.is_crypto;
};
