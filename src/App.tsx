import { Link } from "react-router-dom"
import React from 'react'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={`portfolio`}>Portfolio</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default App
