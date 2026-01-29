module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      deletedAt: Date
    },
    { timestamps: true }
  )

  const FeatureTitle = mongoose.model('FeatureTitle', schema, 'features-titles')
  return FeatureTitle
}
