import axios from 'axios'

axios.defaults.headers.common['content-type'] = 'application/octet-stream'
axios.defaults.headers.common['x-rapidapi-host'] =
  'coronavirus-monitor.p.rapidapi.com'
axios.defaults.headers.common['x-rapidapi-key'] =
  process.env.REACT_APP_RAPID_API_KEY

export default axios
