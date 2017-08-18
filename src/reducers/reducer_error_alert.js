// State is not an application state, only
// the state this reducer is responsible for

export default function(state = null, action) {
	
	console.log(action);
	
	switch(action.type) {


	case 'ERROR_ALERT':
		return action.payload
	}

	return state
}