import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Button from '../components/Button'

function RespondPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forms/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        setForm(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchForm()
  }, [id])

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleCheckbox = (questionId, option) => {
    const current = answers[questionId] || []
    if (current.includes(option)) {
      setAnswers(prev => ({ ...prev, [questionId]: current.filter(o => o !== option) }))
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: [...current, option] }))
    }
  }

  const handleSubmit = async () => {
    setError('')
    const formattedAnswers = form.questions.map(q => ({
      questionId: q.id,
      value: Array.isArray(answers[q.id]) ? answers[q.id].join(', ') : answers[q.id] || ''
    }))

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forms/${id}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formattedAnswers })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Memuat...</p></div>
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h1>
          <p className="text-gray-500 mb-6">Jawaban kamu sudah berhasil dikirim.</p>
          <Button onClick={() => navigate('/forms')}>Kembali ke Beranda</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-500 px-6 py-4">
        <h1 className="text-xl font-bold text-white">{form.title}</h1>
        {form.description && <p className="text-blue-100 text-sm mt-1">{form.description}</p>}
      </div>

      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

        <div className="flex flex-col gap-4">
          {form.questions && form.questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-sm font-medium text-gray-800 mb-3">
                {index + 1}. {q.label}
                {q.required && <span className="text-red-500 ml-1">*</span>}
              </p>

              {q.type === 'short_answer' && (
                <input
                  type="text"
                  placeholder="Jawaban kamu"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              {q.type === 'multiple_choice' && q.options && (
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleChange(q.id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'checkbox' && q.options && (
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(answers[q.id] || []).includes(opt)}
                        onChange={() => handleCheckbox(q.id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'dropdown' && q.options && (
                <select
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Pilih salah satu</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit}>Kirim Jawaban</Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RespondPage