module.exports = (mongoose) => {
  // define que tipo de datos quieres
  const schema = mongoose.Schema(
    {
      title: String, // No se define el tipo de texto al contrario de MySQL
      deletedAt: Date
    },
    { timestamps: true }
  )

  const FeatureTitle = mongoose.model('FeatureTitle', schema, 'features-titles')
  return FeatureTitle
}
