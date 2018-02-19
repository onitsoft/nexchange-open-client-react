let initialState = {
	amount_quote: '...',
	amount_base: '...',
	deposit: '...',
	receive: '...',
	lastEdited: 'deposit'
}

export default (state = initialState, action) => {
	switch(action.type) {
	case 'PRICE_FETCHED':
		return action.payload;
	}

	return state
}
