module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Promoter = mongoose.model('Promoter', schema, 'promoters')
  return Promoter
}
