export default (state = null, action) => {
	switch(action.type) {
	case 'PAIRS_FETCHED':
		return action.payload;
	}

	return state
}
