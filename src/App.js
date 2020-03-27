import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar'
import CasesByCountry from './CasesByCountry'
import db from './db-config'

function App() {
  const id = 'U9FpcTq4l3ulBaQAx8dP'
  const ref = db.firestore().collection('pantau_covid19')
  const viewersRef = db
    .firestore()
    .collection('pantau_covid19')
    .doc(id)

  useEffect(() => {
    let currentViewers

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
  }, [])

  return (
    <div>
      <Navbar />
      <CasesByCountry />
    </div>
  )
}

export default App
