

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'

import CategoryProduct from './components/CategoryProduct'

import Cartitems from './components/Cartitems'
import Register from './components/Register'
import Login from './components/Login'

import ProductByid from './components/ProductByid'
import NavBar from './components/Nvabar/Navbar'



function App() {




  return (
    <>
      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cartitems' element={<Cartitems />} />
          <Route path='/category/:catname' element={<CategoryProduct />} />
          <Route path='/product/:ProductId' element={<ProductByid />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
