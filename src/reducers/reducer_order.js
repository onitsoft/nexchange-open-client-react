import { FETCH_ORDER } from '../actions/types';

export default (state = null, action) => {
	switch(action.type) {
        case FETCH_ORDER:
            return action.payload
        default:
            return state;
    }
}
