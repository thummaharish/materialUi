

import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'

import CategoryProduct from './components/CategoryProduct'

import ProductByid from './components/ProductByid'

import LoginMui from './components/LoginMui'
import RegisterMui from './components/RegisterMui'

import CartitemsMui from './components/CartitemsMui'


function App() {

  return (
    <>
      <div className='body'>
            <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/cartitems' element={<CartitemsMui />} />
              <Route path='/category/:catname' element={<CategoryProduct />} />
              <Route path='/product/:ProductId' element={<ProductByid />} />
              <Route path='/register' element={<RegisterMui />} />
              <Route path='/login' element={<LoginMui />} />
            </Routes> 
      </div>
    </>
  )
}

export default App
