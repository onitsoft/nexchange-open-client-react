import axios from 'axios';
import moment from 'moment';
import config from '../config';


export function errorAlert(error) {
	return {
		type: 'ERROR_ALERT',
		payload: error
	}
}

export function setWallet(payload) {
	return {
		type: 'SET_WALLET',
		payload: payload
	}
}

export function selectCoin(coin) {
	return {
		type: 'COIN_SELECTED',
		payload: coin
	}
}

export function updateAmounts(payload) {
	return {
		type: 'UPDATE_AMOUNTS',
		payload: payload
	}
}

export function fetchPrice(payload) {
	const url = `${config.API_BASE_URL}/price/${payload.pair}/latest/`;
	const request = axios.get(url);

    return (dispatch, getState) => {
        request
	        .then(response => {
	        	if (!response.data.length) return;

	        	dispatch({type: 'PRICE_FETCHED', payload: {
	        		price: response.data[0].ticker.ask,
	        		pair: payload.pair,
	        		lastFetched: new moment()
	        	}});

	        	if (payload.amount) {
		        	dispatch({type: 'UPDATE_AMOUNTS', payload: {
		        		price: response.data[0].ticker.ask,
		        		amount: payload.amount,
		        		lastEdited: payload.lastEdited,
		        	}});
	        	}
	        }).catch(error => {
	        	console.log(error);
	        });    
    };
}
