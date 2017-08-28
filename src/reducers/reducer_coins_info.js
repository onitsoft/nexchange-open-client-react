export default (state = [], action) => {
	switch(action.type) {
	case 'COINS_INFO':
		return action.payload
	}

	return state
}