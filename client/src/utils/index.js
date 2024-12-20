import axios from 'axios'

// const productionUrl = 'https://jobify-mern-proj.onrender.com/api/v1'
const productionUrl = 'http://localhost:5000'

export const customFetch = axios.create({
  baseURL: productionUrl,
})
