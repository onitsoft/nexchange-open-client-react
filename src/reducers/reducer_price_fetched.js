let initialState = {
	deposit: '...',
	receive: '...',
	lastEdited: 'deposit'
}

export default (state = initialState, action) => {
	// if (action.type === 'PRICE_FETCHED') {
	// 	console.log("STATE", state, action.payload);
	// }

	switch(action.type) {
	case 'PRICE_FETCHED':
		return action.payload;
	}

	return state
}
