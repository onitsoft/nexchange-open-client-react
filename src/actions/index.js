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

export function updateAmounts(data) {
	if (data.useNewPrice) {
		const url = `${config.API_BASE_URL}/price/${data.pair}/latest/`;
		const request = axios.get(url);

	    return (dispatch, getState) => {
	        request
	            .then(response => {
	            	if (!response.data.length) return;

	            	dispatch({type: 'UPDATE_AMOUNTS', payload: {
	            		ask: response.data[0].ticker.ask,
	            		amount: data.amount,
	            		lastEdited: data.lastEdited,
	            		useNewPrice: true
	            	}})
	            }).catch(error => {
	            	console.log(error);
	            });    
	    };
	}

	return {
		type: 'UPDATE_AMOUNTS',
		payload: {
    		amount: data.amount,
    		lastEdited: data.lastEdited,
    		useNewPrice: false
		}
	}
}

// ORIGINAL
// export function fetchPrice(pair) {
// 	const url = `${config.API_BASE_URL}/price/${pair}/latest/`;
// 	const request = axios.get(url);

// 	return {
// 		type: 'FETCH_PRICE',
// 		payload: request
// 	}
// }
// ORIGINAL


// export function fetchPrice(data) {

// }


// export function updateAmounts(data) {
	// In this function we want to update the amounts
	// How we update the amounts depends on whether
	// we want to fetch a new price or not.

	// If we do want to keep new price, then do the same as before with dispatch 
	// after response to price endpoint has been received.
	
	// If we do not, then we have to find a way to use
	// previous price.



	// if (data.useNewPrice) {
	// 	const url = `${config.API_BASE_URL}/price/${data.pair}/latest/`;
	// 	const request = axios.get(url);

	//     return (dispatch, getState) => {
	//         //dispatch({type : 'REQUEST_STARTED'});
	        
	//         request
	//             .then(response => {
	//             	if (!response.data.length) return;

	//             	console.log('RESPONSE 1', response.data[0].ticker.ask);
	//             	dispatch({type: 'UPDATE_AMOUNTS', payload: {
	//             		ask: response.data[0].ticker.ask,
	//             		lastEdited: data.lastEdited,
	//             		priceUpdated: true
	//             	}})
	//             }).catch(error => {
	//             	//dispatch({type : 'FETCH_PRICE_FAILED', error : error})
	//             	console.log(error);
	//             });    
	//     };
	// } else {

	// }
// }
