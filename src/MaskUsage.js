import React, { useState, useEffect } from 'react'
import axios from './api'

export default () => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    axios
      .get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/masks.php')
      .then(res => {
        console.log(res.data)
        const rawResponse = res.data
        const b64Response = btoa(rawResponse)
        const imageUrl = 'data:image/png;base64,' + b64Response
        setUrl(imageUrl)
      })
      .catch(e => console.log(e))
  }, [])

  return <image href={url} />
}
