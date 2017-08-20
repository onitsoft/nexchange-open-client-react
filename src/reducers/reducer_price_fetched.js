export default (state = null, action) => {
	switch(action.type) {
	case 'PRICE_FETCHED':
		return action.payload;
	}

	return state
}