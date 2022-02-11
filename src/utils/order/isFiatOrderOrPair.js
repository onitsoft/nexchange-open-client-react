const isFiatOrderOrPair = orderOrPair =>
    orderOrPair?.pair ? !orderOrPair?.pair.quote?.is_crypto : !orderOrPair?.quote?.is_crypto

export default isFiatOrderOrPair
