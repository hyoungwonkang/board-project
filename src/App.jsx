import './App.css'
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import ArticleWrite from './components/ArticleWrite'
import ArticleView from './components/ArticleView'
import { useCustomMove } from './hooks/useCustomMove'

function App() {
  const { moveToList } = useCustomMove();
  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/write" style={{ textDecoration: 'none', color: '#fff', background: '#007bff', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 등록
        </Link>
        <button onClick={() => moveToList({ page: 1, size: 10, keyfield: '', keyword: '' })}
          style={{ textDecoration: 'none', color: '#fff', background: '#28a745', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          게시글 목록조회
        </button>
      </div>
      <Routes>
        <Route path='/list' element={<ArticleList />} />
        <Route path='/view/:id' element={<ArticleView />} />
        <Route path='/write' element={<ArticleWrite />} />
      </Routes>
    </>
  )
}

export default App
