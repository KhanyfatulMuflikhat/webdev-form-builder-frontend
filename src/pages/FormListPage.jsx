import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { api } from '../lib/api'

function FormListPage() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const fetchForms = async () => {
    try {
      const data = await api('/api/forms')
      setForms(data)
    } catch (err) {
      if (err.message === 'Token tidak ditemukan' || err.message === 'Token tidak valid') {
        navigate('/login')
      }
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForms()
  }, [])

  const handleCreate = async () => {
    if (!newTitle) return
    try {
      await api('/api/forms', {
        method: 'POST',
        body: JSON.stringify({ title: newTitle, description: newDesc }),
      })
      setNewTitle('')
      setNewDesc('')
      setShowModal(false)
      fetchForms()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus form ini?')) return
    try {
      await api(`/api/forms/${id}`, { method: 'DELETE' })
      fetchForms()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Form Saya</h1>
          <Button onClick={() => setShowModal(true)}>+ Buat Form</Button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Buat Form Baru</h2>
              <div className="flex flex-col gap-3">
                <input
                  placeholder="Judul form"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  placeholder="Deskripsi (opsional)"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
                  <Button onClick={handleCreate}>Buat</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="text-gray-500 text-sm">Memuat...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col gap-4">
          {forms.map((form) => (
            <div key={form.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{form.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{form.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${form.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {form.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(form.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/forms/${form.id}`}>
                  <Button variant="secondary">Lihat Detail</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(form.id)}>Hapus</Button>
              </div>
            </div>
          ))}
          {!loading && forms.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-10">Belum ada form. Buat form pertamamu!</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FormListPage