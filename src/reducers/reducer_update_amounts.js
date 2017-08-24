let initialState = {
	deposit: 1,
	receive: '...',
	lastEdited: null
}

function getDecimalPlaces (amount) {
    let decimalPlaces = 2,
        invertedDecimalSize = -Math.floor(Math.log10(amount));

    if (invertedDecimalSize > 0)
        decimalPlaces = decimalPlaces + invertedDecimalSize;

    return decimalPlaces;
}

export default (state = initialState, action) => {
	if (action.type == 'UPDATE_AMOUNTS') {
		let newState = Object.assign({}, state),
			opposite = (action.payload.lastEdited == 'receive' ? 'deposit' : 'receive'),
			price = (action.payload.price ? action.payload.price : state.price),
			quote = (action.payload.amount ? action.payload.amount : state[action.payload.lastEdited]),
			sum = (action.payload.lastEdited == 'receive' ? parseFloat(quote) * price : parseFloat(quote) / price),
			decimalPlaces = getDecimalPlaces(sum);

		newState['lastEdited'] = action.payload.lastEdited;
		newState[action.payload.lastEdited] = action.payload.amount;
		newState[opposite] = (!isNaN(decimalPlaces) && !isNaN(sum) && isFinite(decimalPlaces) ? sum.toFixed(decimalPlaces) : '...');

		return newState;
	}

	return state
}