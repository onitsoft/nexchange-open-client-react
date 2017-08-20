let initialState = {
	deposit: 1,
	receive: '...',
	lastEdited: null
}

export default (state = initialState, action) => {
	if (action.type == 'UPDATE_AMOUNTS') {
		let newState = Object.assign({}, state),
			opposite = (action.payload.lastEdited == 'receive' ? 'deposit' : 'receive'),
			price = (action.payload.price ? action.payload.price : state.price),
			quote = (action.payload.amount ? action.payload.amount : state[action.payload.lastEdited]),
			sum = parseFloat(quote) * price;

		newState['lastEdited'] = action.payload.lastEdited;
		newState[action.payload.lastEdited] = action.payload.amount;
		newState[opposite] = sum.toFixed(8);

		return newState;
	}

	return state
}