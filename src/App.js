import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Search from './components/Home/Search/Search'
import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import PostDetail from './components/Posts/Post/PostDetail/PostDetail'
import Posts from './components/Posts/Posts'
import Footer from './components/Footer/Footer'
import './App.css'
import 'antd/dist/antd'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:postName" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/id/:_id" element={<PostDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App