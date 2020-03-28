import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import db from './db-config'
import 'dotenv'
import AppContext from './AppContext'
import axios from './api'

function App() {
  let currentViewers
  const id = process.env.REACT_APP_COLLECTION_ID
  const ref = db.firestore().collection('pantau_covid19')
  const viewersRef = db
    .firestore()
    .collection('pantau_covid19')
    .doc(id)

  ref
    .get()
    .then(snap => {
      snap.forEach(doc => {
        currentViewers = doc.data().viewers
      })
    })
    .then(() => {
      viewersRef.update({
        viewers: currentViewers + 1
      })
    })

  return (
    <AppContext.ThemeProvider>
      <AppContext.LanguageProvider>
        <Navbar />
        <Home />
      </AppContext.LanguageProvider>
    </AppContext.ThemeProvider>
  )
}

export default App
