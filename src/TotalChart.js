import React, { useState, useEffect, useContext } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Container, Card, CardDeck } from 'react-bootstrap'
import axios from './api'
import AppContext from './AppContext'

export default () => {
  const { theme, changeTheme } = useContext(AppContext.ThemeContext)

  const [dataCases, setDataCases] = useState([])
  const [dataDeaths, setDataDeaths] = useState([])
  const [dataRecovered, setDataRecovered] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    axios
      .get('https://covid-193.p.rapidapi.com/history', {
        params: { country: 'All' }
      })
      .then(response => {
        const tempDataCases = []
        const tempDataDeath = []
        const tempDataRecovered = []
        const tempLabels = []
        console.log(response.data.response)
        response.data.response.map((dat, index) => {
          if (index % 48 === 0) {
            tempDataCases.push(dat.cases.total)
            tempDataDeath.push(dat.deaths.total)
            tempDataRecovered.push(dat.cases.recovered)
            tempLabels.push(dat.day)
          }
        })
        return { tempDataCases, tempDataDeath, tempDataRecovered, tempLabels }
      })
      .then(response => {
        setDataCases(response.tempDataCases.reverse())
        setDataDeaths(response.tempDataDeath.reverse())
        setDataRecovered(response.tempDataRecovered.reverse())
        setLabels(response.tempLabels.reverse())
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <CardDeck>
      <Card bg={theme === 'dark' ? 'dark' : 'light'}>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Cases',
                borderColor: 'black',
                backgroundColor: 'black',
                fill: false,
                data: dataCases
              },
              {
                label: 'Death',
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                data: dataDeaths
              },
              {
                label: 'Recovered',
                borderColor: 'green',
                backgroundColor: 'green',
                fill: false,
                data: dataRecovered
              }
            ]
          }}
          options={{
            // title: { display: true, text: 'Graph' },
            legend: {
              display: true,
              position: 'top',
              labels: { fontColor: theme === 'dark' ? 'white' : 'black' }
            },
            responsive: true,
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: theme === 'dark' ? 'white' : 'black'
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: theme === 'dark' ? 'white' : 'black'
                  }
                }
              ]
            }
          }}
        />
      </Card>
    </CardDeck>
  )
}
