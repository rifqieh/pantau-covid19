import React, { useContext } from 'react'
import { Dropdown, Navbar } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'
import AppContext from './AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const FlagButton = props => {
  return props.isActive ? (
    <Dropdown.Item active style={{ padding: '0', paddingLeft: '1em' }}>
      <ReactCountryFlag
        className="emojiFlag"
        countryCode={props.countryCode}
        style={{
          fontSize: '2em'
        }}
      />
      {props.countryName}
    </Dropdown.Item>
  ) : (
    <Dropdown.Item style={{ padding: '0', paddingLeft: '1em' }}>
      <ReactCountryFlag
        className="emojiFlag"
        countryCode={props.countryCode}
        style={{
          fontSize: '2em'
        }}
      />
      {props.countryName}
    </Dropdown.Item>
  )
}

export default () => {
  const { theme, changeTheme } = useContext(AppContext.ThemeContext)
  const { language, changeLanguage } = useContext(AppContext.LanguageContext)
  console.log(theme)

  return (
    <Navbar
      bg={theme === 'dark' ? 'dark' : 'light'}
      fixed="top"
      variant={theme === 'dark' ? 'dark' : 'light'}
    >
      <Navbar.Brand className="mr-auto">Pantau Covid-19</Navbar.Brand>
      <Dropdown style={{ marginRight: '1rem' }}>
        <Dropdown.Toggle variant="info" color="white">
          Indonesia
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ marginRight: '10rem' }}>
          <FlagButton
            countryCode="ID"
            countryName=" Indonesia"
            isActive={language === 'ID' ? true : false}
          />
          <FlagButton
            countryCode="US"
            countryName=" English"
            isActive={language === 'US' ? true : false}
          />
        </Dropdown.Menu>
      </Dropdown>
      <button
        style={{
          backgroundColor: 'transparent',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          cursor: 'pointer',
          overflow: 'hidden',
          outline: 'none'
        }}
        onClick={() => {
          if (theme === 'dark') changeTheme('light')
          else changeTheme('dark')
        }}
      >
        <FontAwesomeIcon
          icon={theme === 'dark' ? faSun : faMoon}
          color={theme === 'dark' ? 'orange' : '#333940'}
          size="2x"
        />
      </button>
    </Navbar>
  )
}
