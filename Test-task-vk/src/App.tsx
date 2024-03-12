

import './App.css'
import { getGroupsWithDelay } from './api/getGroups'

function App() {


  return (
    <>
     <button onClick={getGroupsWithDelay}>click me</button>
    </>
  )
}

export default App
