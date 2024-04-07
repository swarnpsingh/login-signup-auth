import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./pages/Register.jsx"
import Login from './pages/Login.jsx'
import PaswordReset from './pages/PaswordReset.jsx'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Register />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' exact Component={App}/>
    <Route path='/register' exact Component={Register}/>
    <Route path='/login' exact Component={Login}/>
    <Route path='/password-reset' exact Component={PaswordReset}/>
    </Routes>
  </BrowserRouter>
)
