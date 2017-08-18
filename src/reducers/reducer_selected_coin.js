export default function(state = null, action) {
	switch(action.type) {
	case 'COIN_SELECTED':
		return action.payload
	}

	return state
}