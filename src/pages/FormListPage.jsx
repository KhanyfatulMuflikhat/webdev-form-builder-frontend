import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { dummyForms } from '../data/dummyData'

function FormListPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Form Saya</h1>
          <Button>+ Buat Form</Button>
        </div>

        <div className="flex flex-col gap-4">
          {dummyForms.map((form) => (
            <div key={form.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{form.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{form.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${form.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {form.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-xs text-gray-400">{form.createdAt}</span>
                </div>
              </div>
              <Link to={`/forms/${form.id}`}>
                <Button variant="secondary">Lihat Detail</Button>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FormListPage