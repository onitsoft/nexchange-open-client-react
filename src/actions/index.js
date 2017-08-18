import axios from 'axios';
import config from '../config';

export function errorAlert(error) {
	return {
		type: 'ERROR_ALERT',
		payload: error
	}
}

export function selectCoin(coin) {
	return {
		type: 'COIN_SELECTED',
		payload: coin
	}
}

export function updateAmounts(amount) {
	return {
		type: 'UPDATE_AMOUNTS',
		payload: amount
	}
}

export function fetchPrice(pair) {
	const url = `${config.API_BASE_URL}/price/${pair}/latest/`;
	const request = axios.get(url);

	return {
		type: 'FETCH_PRICE',
		payload: request
	}
}