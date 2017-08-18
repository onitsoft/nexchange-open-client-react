export default (state = null, action) => {
	switch(action.type) {
	case 'FETCH_PRICE':
		return action.payload.data[0].ticker.ask
	}

	return state
}