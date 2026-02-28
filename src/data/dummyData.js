export const dummyForms = [
  {
    id: 1,
    title: "Survey Kepuasan Pelanggan",
    description: "Form untuk mengukur kepuasan pelanggan kami",
    status: "active",
    createdAt: "2026-02-01",
    questions: [
      { id: 1, label: "Nama lengkap kamu?", type: "short_answer", required: true },
      { id: 2, label: "Seberapa puas kamu dengan layanan kami?", type: "multiple_choice", required: true, options: ["Sangat Puas", "Puas", "Cukup", "Tidak Puas"] },
      { id: 3, label: "Fitur apa yang kamu suka?", type: "checkbox", required: false, options: ["Kecepatan", "Kemudahan", "Harga", "Support"] },
    ]
  },
  {
    id: 2,
    title: "Pendaftaran Event",
    description: "Form pendaftaran untuk event tahunan kami",
    status: "active",
    createdAt: "2026-02-10",
    questions: [
      { id: 1, label: "Nama kamu?", type: "short_answer", required: true },
      { id: 2, label: "Pilih sesi yang ingin dihadiri", type: "dropdown", required: true, options: ["Sesi Pagi", "Sesi Siang", "Sesi Malam"] },
    ]
  },
  {
    id: 3,
    title: "Feedback Produk",
    description: "Bantu kami memperbaiki produk dengan feedback kamu",
    status: "inactive",
    createdAt: "2026-01-15",
    questions: [
      { id: 1, label: "Produk apa yang kamu gunakan?", type: "short_answer", required: true },
      { id: 2, label: "Apa yang perlu diperbaiki?", type: "short_answer", required: false },
    ]
  },
]

export const dummyUser = {
  name: "Khanyfatul",
  email: "khanyfatul@email.com",
}