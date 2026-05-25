import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { getTasks } from './api/task.api'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import View from './components/View'
import Create from './components/Create'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/tasks/new' element={<Create></Create>}></Route>
          <Route path='/tasks/:id' element={< View></ View>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
