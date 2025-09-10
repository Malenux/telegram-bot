module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'La sección "nombre" es obligatorio']
      },
      title: String,
      description: String,
      buttonText: String,
      buttonLink: String,
      isActive: {
        type: Boolean,
        default: true
      },
      deletedAt: Date,
    },
    { timestamps: true }
  )

  const Hero = mongoose.model('Hero', schema, 'heros')
  return Hero
}
