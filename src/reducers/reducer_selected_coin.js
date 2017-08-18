const initialState = {
	past: {
		deposit: 'BTC',
		receive: 'ETH'
	},
	present: {
		deposit: 'BTC',
		receive: 'ETH'
	}
}

export default (state = initialState, action) => {
	if (action.type=='COIN_SELECTED' && action.payload && action.payload.present && action.payload.present.deposit == action.payload.present.receive) {
		action.payload.present.deposit = action.payload.past.receive;
		action.payload.present.receive = action.payload.past.deposit;

		action.payload.past.deposit = action.payload.present.deposit;
		action.payload.past.receive = action.payload.present.receive;
	}

	switch(action.type) {
	case 'COIN_SELECTED':
		return action.payload
	}

	return state
}