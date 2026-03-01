import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FormListPage from './pages/FormListPage'
import FormDetailPage from './pages/FormDetailPage'
import RespondPage from './pages/RespondPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forms" element={<FormListPage />} />
        <Route path="/forms/:id" element={<FormDetailPage />} />
        <Route path="/forms/:id/respond" element={<RespondPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App