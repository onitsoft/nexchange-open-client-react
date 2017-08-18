export function errorAlert (error) {
	console.log(error);

	// errorAlert is an action creator. It needs to 
	// return an action, an object with a type property
	return {
		type: 'ERROR_ALERT',
		payload: error
	}
}