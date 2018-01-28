let initialState = {
	deposit: '',
	receive: '',
	lastEdited: 'deposit'
}

export default (state = initialState, action) => {
	if (action.type === 'UPDATE_AMOUNTS') {
		let newState = Object.assign({}, state),
			opposite = (action.payload.lastEdited == 'receive' ? 'deposit' : 'receive'),
			price = (action.payload.price ? action.payload.price : state.price),
			quote = (action.payload.amount ? action.payload.amount : (action.payload.amount == "" ? 0 : state[action.payload.lastEdited])),
			sum = (action.payload.lastEdited === 'receive' ? parseFloat(quote) * price : parseFloat(quote) / price);

		newState['lastEdited'] = action.payload.lastEdited;
		newState[action.payload.lastEdited] = action.payload.amount;
		newState[opposite] = (!isNaN(sum) && isFinite(sum) && sum > 0 ? sum.toFixed(8) : '...');

		return newState;
	}

	return state
}
