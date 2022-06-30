import React from 'react'
import './App.css'
import 'antd/dist/antd'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostDetail from './components/Home/Posts/PostDetail/PostDetail'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App