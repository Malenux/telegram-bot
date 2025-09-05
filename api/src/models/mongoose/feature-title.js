module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      isActive: {
        type: Boolean,
        default: true
      },
      deletedAt: Date,
    },
    { timestamps: true }
  )

  const FeatureTitle = mongoose.model('FeatureTitle', schema, 'feature-titles')
  return FeatureTitle
}
