export function errorAlert (error) {
	console.log("ERROR ACTION", error);

	// errorAlert is an action creator. It needs to 
	// return an action, an object with a type property
	return {
		type: 'ERROR_ALERT',
		payload: error
	}
}

export function selectCoin (coin) {
	console.log("COIN ACTION", coin);

	// errorAlert is an action creator. It needs to 
	// return an action, an object with a type property
	return {
		type: 'COIN_SELECTED',
		payload: coin
	}
}