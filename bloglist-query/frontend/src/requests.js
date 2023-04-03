import axios from 'axios';

const baseUrl = 'api/blogs';

let token = null;
export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export const updateBlog = async (blog) => {
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user.id,
    likes: blog.likes + 1
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog);
  return response.data;
};

export const removeBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
