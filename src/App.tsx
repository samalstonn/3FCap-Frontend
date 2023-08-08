import React, { useEffect, useState } from 'react'
import './App.css'

export async function loadData() {
  const url = 'http://localhost:5000/portfolio'
  return fetch(url)
}
function App() {
  const [data, setData] = useState<any>()

  const onDataLoaded = (data: any) => {
    setData(data)
  }
  async function handleLoad(onDataLoaded: (data: any) => void) {
    await loadData().then((response) => response.json()).then((payload) => {
      onDataLoaded(payload)
    })
  }

  useEffect(() => {
    handleLoad(onDataLoaded)
  }, [])

  return (
    <div className="App">
      <p>
        {JSON.stringify(data)}
      </p>


    </div>
  )
}

export default App
