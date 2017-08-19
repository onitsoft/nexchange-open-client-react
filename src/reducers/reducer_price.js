export default (state = null, action) => {
	console.log('FETCH PRICE', action)

	switch(action.type) {
	case 'FETCH_PRICE':
		return 2 // action.payload.data[0].ticker.ask
	}

	return state
}