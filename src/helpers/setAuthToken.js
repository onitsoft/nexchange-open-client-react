import axios from 'axios';

export default () => {
	axios.defaults.headers.common['Authorization'] = '';
	delete axios.defaults.headers.common['Authorization'];

	const token = localStorage.token;
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}
}