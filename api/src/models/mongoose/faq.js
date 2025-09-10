module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'La sección "nombre" es obligatorio']
      },
      title: String,
      description: String,
      isActive: {
        type: Boolean,
        default: true
      },
      deletedAt: Date,
    },
    { timestamps: true }
  )

  const Faq = mongoose.model('Faq', schema, 'faqs')
  return Faq
}
