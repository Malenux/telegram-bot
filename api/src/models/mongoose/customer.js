module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      email: String
    },
    { timestamps: true }
  )

  const Customer = mongoose.model('Customer', schema, 'customers')
  return Customer
}
