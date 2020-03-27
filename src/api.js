import axios from 'axios'

axios.defaults.headers.common['content-type'] = 'application/octet-stream'
axios.defaults.headers.common['x-rapidapi-host'] =
  'coronavirus-monitor.p.rapidapi.com'
axios.defaults.headers.common['x-rapidapi-key'] =
  '28ace3fa3dmsha8a82e678f90957p1a2413jsnb7152ef288ed'

export default axios
