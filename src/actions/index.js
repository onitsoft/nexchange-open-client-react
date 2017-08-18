export function errorAlert (error) {
	return {
		type: 'ERROR_ALERT',
		payload: error
	}
}

export function selectCoin (coin) {
	return {
		type: 'COIN_SELECTED',
		payload: coin
	}
}