import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;
const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (blog) => {
	const config = { headers: { Authorization: token } };
	const response = await axios.post(baseUrl, blog, config);
	return response.data;
};

const update = async (blog) => {
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
	return response.data;
};

const remove = async (id) => {
	const config = { headers: { Authorization: token } };

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

const addComment = async (id, comment) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
	return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove, setToken, addComment };
