let initialState = {
	deposit: 1,
	receive: '...',
	ask: null,
	lastEdited: null,
	useNewPrice: false
}

export default (state = initialState, action) => {
	console.log('UPDATE AMOUNTS', action)

	if (action.type == 'UPDATE_AMOUNTS') {
		let newState = Object.assign({}, state),
			opposite = (action.payload.lastEdited == 'receive' ? 'deposit' : 'receive'),
			ask = (action.payload.ask ? action.payload.ask : state.ask),
			quote = (action.payload.amount ? action.payload.amount : state[action.payload.lastEdited]),
			sum = parseFloat(quote) * ask;

		newState['lastEdited'] = action.payload.lastEdited;

		// new input amount
		if (action.payload.amount)
			newState[action.payload.lastEdited] = action.payload.amount;

		newState[opposite] = sum.toFixed(8);


		if (action.payload.useNewPrice == true) {
			newState['ask'] = parseFloat(action.payload.ask);
		} else {
			// let opposite = (action.payload.lastEdited == 'receive' ? 'deposit' : 'receive'),
			// 	sum = parseFloat(nextProps.receive) * ask;

			// if (this.props.type == 'receive') {
				
			// } else {
			// 	this.validateReceiveAmount(sum);
			// }

			// nextProps.lastEdited = this.props.type;
			// nextProps[opposite] = (isNaN(sum) ? '...' : sum.toFixed(8));
			// nextProps['update'] = false;
			// this.props.updateAmounts(nextProps)

		}


		console.log(action.payload, state, newState);

		return newState;
	}

	// switch(action.type) {
	// case 'UPDATE_AMOUNTS':
	// 	return action.payload
	// }

	return state
}