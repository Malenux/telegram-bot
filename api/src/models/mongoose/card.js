module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      title: String,
      description: String,
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Card = mongoose.model('Card', schema, 'cards')
  return Card
}
