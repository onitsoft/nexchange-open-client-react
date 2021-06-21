export default isFiatOrder = order => Boolean(order && order.pair && order.pair.quote && !order.pair.quote.is_crypto);
