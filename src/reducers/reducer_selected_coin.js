const initialState = {
	deposit: null,
	receive: null,
	prev: {
		deposit: null,
		receive: null,
	},
	lastSelected: 'deposit'
}

export default (state = initialState, action) => {
	let payload = Object.assign({}, action.payload);

	if (action.type === 'COIN_SELECTED') {
		if (payload.deposit === payload.receive) {
			payload.deposit = payload.prev.receive;
			payload.receive = payload.prev.deposit;
		}

		payload.prev.deposit = payload.deposit;
		payload.prev.receive = payload.receive;

		return payload;
	}

	return state
}
