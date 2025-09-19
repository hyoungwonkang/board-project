import { useState } from 'react'
import './App.css'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import ArticleWrite from './components/ArticleWrite'
import ArticleView from './components/ArticleView'
import ArticleModify from './components/ArticleModify'

function App() {
  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/write" style={{ textDecoration: 'none', color: '#fff', background: '#007bff', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 등록
        </Link>
        <Link to="/list" style={{ textDecoration: 'none', color: '#fff', background: '#28a745', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 목록조회
        </Link>
      </div>
      <Routes>
        <Route path='/list' element={<ArticleList />} />
        <Route path='/view/:id' element={<ArticleView />} />
        <Route path='/write' element={<ArticleWrite />} />
        <Route path='/modify/:id' element={<ArticleModify />} />
      </Routes>
    </>
  )
}

export default App
