let initialState = {
	deposit: 1,
	receive: '...',
	lastEdited: null,
	update: false
}

export default (state = initialState, action) => {
	switch(action.type) {
	case 'UPDATE_AMOUNTS':
		return action.payload
	}

	return state
}