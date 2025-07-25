import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-parkify.vercel.app/api', // change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
