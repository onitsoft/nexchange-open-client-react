export default (state = {show: false, message: null}, action) => {
	switch(action.type) {
		case 'ERROR_ALERT':
			return action.payload;
		default:
			return state;
	}
}