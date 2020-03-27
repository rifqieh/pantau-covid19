import React, { createContext, useState } from 'react'

const AppContext = () => {
  const LanguageContext = createContext()
  const ThemeContext = createContext()

  const LanguageProvider = props => {
    const [language, setLanguage] = useState('ID')
    const changeLanguage = newLanguage => setLanguage(newLanguage)
    const languageState = { language, changeLanguage }

    return (
      <LanguageContext.Provider value={languageState}>
        {props.children}
      </LanguageContext.Provider>
    )
  }

  const ThemeProvider = props => {
    const [theme, setTheme] = useState('light')
    const changeTheme = newTheme => setTheme(newTheme)
    const themeState = { theme, changeTheme }

    return (
      <ThemeContext.Provider value={themeState}>
        {props.children}
      </ThemeContext.Provider>
    )
  }

  return {
    LanguageContext,
    LanguageProvider,
    ThemeContext,
    ThemeProvider
  }
}

export default AppContext()
