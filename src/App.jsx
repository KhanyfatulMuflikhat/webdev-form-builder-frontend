import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FormListPage from './pages/FormListPage'
import FormDetailPage from './pages/FormDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forms" element={<FormListPage />} />
        <Route path="/forms/:id" element={<FormDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App