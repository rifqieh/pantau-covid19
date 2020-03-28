import React, { useState, useEffect, useContext } from 'react'
import AppContext from './AppContext'
import {
  Container,
  Card,
  CardDeck,
  InputGroup,
  Table,
  FormControl,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import axios from './api'

export default () => {
  const { theme, changeTheme } = useContext(AppContext.ThemeContext)
  const { language, changeLanguage } = useContext(AppContext.LanguageContext)

  const [dataCountry, setDataCountry] = useState([])

  const [filteredCountry, setFilteredCountry] = useState([])
  const [filterText, setFilterText] = useState('')
  const [isAscending, setIsAscending] = useState(true)
  const [orderBy, setOrderBy] = useState(0)

  const style = {
    cardHeader: {
      fontSize: '20px'
    }
  }

  console.log(dataCountry[0])

  useEffect(() => {
    axios
      .get(
        'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php'
      )
      .then(response => {
        // console.log(response.data)
        setDataCountry([...response.data.countries_stat])
        setFilteredCountry([...response.data.countries_stat])
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const orderByDeath = () => {
    var newFilter = filteredCountry
    newFilter.sort((a, b) => {
      var deathA = a.deaths.replace(/,/g, '.')
      var deathB = b.deaths.replace(/,/g, '.')
      if (deathA.includes('.')) deathA = parseInt(parseFloat(deathA) * 1000)
      else deathA = parseInt(deathA)
      if (deathB.includes('.')) deathB = parseInt(parseFloat(deathB) * 1000)
      else deathB = parseInt(deathB)

      console.log(deathA)

      return deathA - deathB
    })
    setFilteredCountry([...newFilter])
  }

  const orderByCases = () => {
    var newFilter = filteredCountry
    newFilter.sort((a, b) => {
      var casesA = a.cases.replace(/,/g, '.')
      var casesB = b.cases.replace(/,/g, '.')
      if (casesA.includes('.')) casesA = parseInt(parseFloat(casesA) * 1000)
      else casesA = parseInt(casesA)
      if (casesB.includes('.')) casesB = parseInt(parseFloat(casesB) * 1000)
      else casesB = parseInt(casesB)

      console.log(casesA)

      return casesA - casesB
    })
    setFilteredCountry([...newFilter])
  }

  const handleChangeAscending = () => {
    var newFilter = filteredCountry

    console.log(newFilter)
    newFilter.sort()
    newFilter.reverse()

    setFilteredCountry([...newFilter])
    console.log(newFilter)
  }

  const handleChangeFilter = e => {
    const newFilter = dataCountry.filter(data =>
      data.country_name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setFilteredCountry([...newFilter])
  }

  const getList = () => {
    const listCountry = filteredCountry.map((data, idx) => (
      <tr key={idx}>
        <td>{data.country_name}</td>
        <td>{data.cases}</td>
        <td>{data.deaths}</td>
        <td>{data.total_recovered}</td>
        <td>{data.new_deaths}</td>
        <td>{data.new_cases}</td>
        <td>{data.serious_critical}</td>
        <td>{data.active_cases}</td>
      </tr>
    ))

    return listCountry
  }

  return (
    <>
      <Card bg={theme === 'dark' ? 'dark' : 'light'}>
        <Card.Body>
          <InputGroup>
            <FormControl
              placeholder="Filter Country"
              aria-label="Filter Country"
              aria-describedby="basic-addon2"
              // value={filterText}
              onChange={handleChangeFilter}
            />
            {/* <DropdownButton
              id="dropdown-item-button"
              title="Order By"
              style={{ marginLeft: '10px' }}
              variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
            >
              <Dropdown.Item as="button" onClick={orderByCases}>
                Cases
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={orderByDeath}>
                Death
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              id="dropdown-item-button"
              title="Ascending"
              style={{ marginLeft: '10px' }}
              variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
            >
              <Dropdown.Item as="button">Ascending</Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => handleChangeAscending()}
              >
                Descending
              </Dropdown.Item>
            </DropdownButton> */}
          </InputGroup>
          <br />
          <Table
            striped
            bordered
            hover
            variant={theme === 'dark' ? 'dark' : 'light'}
            responsive
          >
            <thead>
              <tr>
                <th>Country Name</th>
                <th>Cases</th>
                <th>Deaths</th>
                <th>Recovered</th>
                <th>New Deaths</th>
                <th>New Cases</th>
                <th>Serious Critical</th>
                <th>Active Cases</th>
              </tr>
            </thead>
            <tbody>{getList()}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
