const initialState = {
	deposit: 'BTC',
	receive: 'ETH',
	prev: {
		deposit: 'BTC',
		receive: 'ETH'
	}
}

export default (state = initialState, action) => {
	if (action.type=='COIN_SELECTED') {
		console.log("COIN SELECTED", state, action.payload);
	}

	let payload = Object.assign({}, action.payload);
	if (action.type=='COIN_SELECTED') {
		if (payload.deposit == payload.receive) {
			payload.deposit = payload.prev.receive;
			payload.receive = payload.prev.deposit;
		}

		payload.prev.deposit = payload.deposit;
		payload.prev.receive = payload.receive;

		return payload;
	}

	return state
}