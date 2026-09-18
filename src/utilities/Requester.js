import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.github.com",
});

const token = process.env.REACT_APP_GITHUB_TOKEN;
if (token) {
    instance.defaults.headers.common['Authorization'] = `token ${token}`;
}

export default instance;