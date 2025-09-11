module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        allowNull: false,
        required: [true, 'La sección "nombre" es obligatorio']
      },
      email: {
        type: String,
        unique: true,
        required: [true, 'La sección "email" es obligatorio']
      },
      isActive: {
        type: Boolean,
        default: true
      },
      deletedAt: Date,
    },
    { timestamps: true }
  )

  const Customer = mongoose.model('Customer', schema, 'customers')
  return Customer
}
