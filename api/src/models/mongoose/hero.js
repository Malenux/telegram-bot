module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      title: String,
      description: String,
      buttonText: String,
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Hero = mongoose.model('Hero', schema, 'hero')
  return Hero
}
