import './App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Table from './pages/Table'
import NotFound from './pages/NotFound'
import DetailPage from './pages/DetailPage'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/Home" element = {<Home/>}></Route>
        <Route path='/Table' element = {<Table/>}></Route>
        <Route path='*' element = {<NotFound/>}></Route>
        <Route path="/Table/:id" element={<DetailPage />} />
      </Routes>
    </>
  )
}

export default App
