import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { api } from '../lib/api'

const QUESTION_TYPES = [
  { value: 'short_answer', label: 'Short Answer' },
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'dropdown', label: 'Dropdown' },
]

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

  // Question states
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [qLabel, setQLabel] = useState('')
  const [qType, setQType] = useState('short_answer')
  const [qRequired, setQRequired] = useState(false)
  const [qOptions, setQOptions] = useState('')

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

  useEffect(() => { fetchForm() }, [id])

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

  const resetQuestionForm = () => {
    setQLabel('')
    setQType('short_answer')
    setQRequired(false)
    setQOptions('')
    setEditingQuestion(null)
    setShowAddQuestion(false)
  }

  const handleAddQuestion = async () => {
    if (!qLabel) return
    const hasOptions = ['multiple_choice', 'checkbox', 'dropdown'].includes(qType)
    const options = hasOptions ? qOptions.split('\n').filter(o => o.trim()) : null

    try {
      await api(`/api/forms/${id}/questions`, {
        method: 'POST',
        body: JSON.stringify({ label: qLabel, type: qType, required: qRequired, options }),
      })
      resetQuestionForm()
      fetchForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditQuestion = (q) => {
    setEditingQuestion(q)
    setQLabel(q.label)
    setQType(q.type)
    setQRequired(q.required)
    setQOptions(q.options ? q.options.join('\n') : '')
    setShowAddQuestion(true)
  }

  const handleUpdateQuestion = async () => {
    if (!qLabel) return
    const hasOptions = ['multiple_choice', 'checkbox', 'dropdown'].includes(qType)
    const options = hasOptions ? qOptions.split('\n').filter(o => o.trim()) : null

    try {
      await api(`/api/forms/${id}/questions/${editingQuestion.id}`, {
        method: 'PUT',
        body: JSON.stringify({ label: qLabel, type: qType, required: qRequired, options }),
      })
      resetQuestionForm()
      fetchForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm('Yakin ingin menghapus pertanyaan ini?')) return
    try {
      await api(`/api/forms/${id}/questions/${questionId}`, { method: 'DELETE' })
      fetchForm()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Memuat...</p></div>
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>

  const hasOptions = ['multiple_choice', 'checkbox', 'dropdown'].includes(qType)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        <Link to="/forms" className="text-sm text-blue-500 hover:underline mb-4 inline-block">← Kembali</Link>

        {/* Form Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          {editMode ? (
            <div className="flex flex-col gap-3">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-lg" />
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
              <div className="flex gap-2">
                <Button onClick={handleUpdate}>Simpan</Button>
                <Button variant="secondary" onClick={() => setEditMode(false)}>Batal</Button>
              </div>
            </div>
          ) : (
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
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setEditMode(true)}>Edit</Button>
                <Link to={`/forms/${id}/respond`}>
                  <Button>Isi Form</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Questions */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Daftar Pertanyaan</h2>
          <Button onClick={() => { resetQuestionForm(); setShowAddQuestion(true) }}>+ Tambah Pertanyaan</Button>
        </div>

        {/* Add/Edit Question Form */}
        {showAddQuestion && (
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">{editingQuestion ? 'Edit Pertanyaan' : 'Tambah Pertanyaan'}</h3>
            <div className="flex flex-col gap-3">
              <input placeholder="Label pertanyaan" value={qLabel} onChange={(e) => setQLabel(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <select value={qType} onChange={(e) => setQType(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              {hasOptions && (
                <textarea
                  placeholder="Tulis setiap opsi di baris baru"
                  value={qOptions}
                  onChange={(e) => setQOptions(e.target.value)}
                  rows={4}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={qRequired} onChange={(e) => setQRequired(e.target.checked)} />
                Wajib diisi
              </label>
              <div className="flex gap-2">
                <Button onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion}>
                  {editingQuestion ? 'Simpan' : 'Tambah'}
                </Button>
                <Button variant="secondary" onClick={resetQuestionForm}>Batal</Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {form.questions && form.questions.length === 0 && (
            <p className="text-gray-400 text-sm">Belum ada pertanyaan.</p>
          )}
          {form.questions && form.questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between">
              <div>
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
              <div className="flex gap-2 ml-4">
                <Button variant="secondary" onClick={() => handleEditQuestion(q)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteQuestion(q.id)}>Hapus</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default FormDetailPage