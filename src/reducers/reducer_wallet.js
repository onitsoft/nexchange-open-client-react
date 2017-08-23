export default (state = {address: '', valid: false, show: false}, action) => {
	switch(action.type) {
	case 'SET_WALLET':
		return action.payload
	}

	return state
}