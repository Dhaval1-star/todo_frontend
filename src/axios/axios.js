import axios from 'axios'

// baseURL: 'http://localhost:8000/api/v1',
// baseURL: 'https://todoapp-04ns.onrender.com/api/v1',
const instance = axios.create({
  baseURL: 'https://todoapp-04ns.onrender.com/api/v1',
    headers: {'Content-type': 'text/html'}
  });

export default instance