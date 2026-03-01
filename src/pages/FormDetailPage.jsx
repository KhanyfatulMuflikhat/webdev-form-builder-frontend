import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { api } from '../lib/api'

function FormDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const fetchForm = async () => {
    try {
      const data = await api(`/api/forms/${id}`)
      setForm(data)
      setTitle(data.title)
      setDescription(data.description || '')
      setStatus(data.status)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForm()
  }, [id])

  const handleUpdate = async () => {
    try {
      await api(`/api/forms/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, status }),
      })
      setEditMode(false)
      fetchForm()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Memuat...</p></div>
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        <Link to="/forms" className="text-sm text-blue-500 hover:underline mb-4 inline-block">
          ← Kembali ke daftar form
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          {editMode ? (
            <div className="flex flex-col gap-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-lg"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
              <div className="flex gap-2">
                <Button onClick={handleUpdate}>Simpan</Button>
                <Button variant="secondary" onClick={() => setEditMode(false)}>Batal</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{form.title}</h1>
                  <p className="text-sm text-gray-500 mt-1">{form.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${form.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {form.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <span className="text-xs text-gray-400">Dibuat: {new Date(form.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <Button variant="secondary" onClick={() => setEditMode(true)}>Edit</Button>
              </div>
            </>
          )}
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-3">Daftar Pertanyaan</h2>
        {form.questions && form.questions.length === 0 && (
          <p className="text-gray-400 text-sm">Belum ada pertanyaan.</p>
        )}
        <div className="flex flex-col gap-3">
          {form.questions && form.questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-sm font-medium text-gray-800">
                {index + 1}. {q.label}
                {q.required && <span className="text-red-500 ml-1">*</span>}
              </p>
              <p className="text-xs text-gray-400 mt-1">Tipe: {q.type}</p>
              {q.options && (
                <ul className="mt-2 flex flex-col gap-1">
                  {q.options.map((opt, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-gray-400 inline-block"></span>
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FormDetailPage