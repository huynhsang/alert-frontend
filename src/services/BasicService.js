import axios from "axios";

const config = {
	headers: {
		'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
	}
};

export default class BasicService {

	get(url, callback) {
		return axios.get(url, config)
			.then((result) => {
				callback(null, result.data);
			}).catch((err) => {
				callback(err.response);
			})
	}

	post(url, data, callback) {
		return axios.post(url, data, config)
			.then((result) => {
				callback(null, result.data);
			}).catch((err) => {
				callback(err.response);
			})
	}

	put(url, data, callback) {
		return axios.put(url, data, config)
			.then((result) => {
				callback(null, result.data);
			}).catch((err) => {
				callback(err.response);
			})
	}

	patch(url, data, callback) {
		return axios.patch(url, data, config)
			.then((result) => {
				callback(null, result.data);
			}).catch((err) => {
				callback(err.response);
			})
	}

	delete(url, callback) {
		return axios.delete(url, config)
			.then((result) => {
				callback(null, result.data);
			}).catch((err) => {
				callback(err.response);
			})
	}
}
