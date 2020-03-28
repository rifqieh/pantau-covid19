import React, { useState, useEffect, useContext } from 'react'
import AppContext from './AppContext'
import { Card, CardDeck } from 'react-bootstrap'
import axios from './api'

export default () => {
  const { theme, changeTheme } = useContext(AppContext.ThemeContext)
  const { language, changeLanguage } = useContext(AppContext.LanguageContext)

  const [totalCases, setTotalCases] = useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [totalRecovered, setTotalRecovered] = useState(0)

  const [dataTakenTime, setDataTakenTime] = useState('')
  const style = {
    cardHeader: {
      fontSize: '20px'
    }
  }

  useEffect(() => {
    axios
      .get(
        'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php'
      )
      .then(response => {
        // console.log(response.data)
        setTotalCases(response.data.total_cases)
        setTotalDeaths(response.data.total_deaths)
        setTotalRecovered(response.data.total_recovered)
        setDataTakenTime(response.data.statistic_taken_at)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CardDeck>
        <Card
          bg={theme === 'dark' ? 'dark' : 'light'}
          text={theme === 'dark' ? 'light' : 'dark'}
        >
          <Card.Header style={style.cardHeader}>Total Cases</Card.Header>
          <Card.Body>
            <Card.Title>{totalCases}</Card.Title>
          </Card.Body>
        </Card>
        <Card bg="danger" text="white">
          <Card.Header style={style.cardHeader}>Total Deaths</Card.Header>
          <Card.Body>
            <Card.Title>{totalDeaths}</Card.Title>
          </Card.Body>
        </Card>
        <Card bg="success" text="white">
          <Card.Header style={style.cardHeader}>Total Recovered</Card.Header>
          <Card.Body>
            <Card.Title>{totalRecovered}</Card.Title>
          </Card.Body>
        </Card>
        <Card bg="info" text="white">
          <Card.Header style={style.cardHeader}>Statistic Taken At</Card.Header>
          <Card.Body>
            <Card.Title>{dataTakenTime}</Card.Title>
          </Card.Body>
        </Card>
      </CardDeck>
    </>
  )
}
