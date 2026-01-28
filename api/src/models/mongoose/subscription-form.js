module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      explanationTitle: String,
      explanationInfo: String,
      explanationFeatured: String,
      infoAreaTitle: String,
      infoAreaSubtitle: String,
      formElementButton: String,
      deletedAt: Date
    },
    { timestamps: true }
  )

  const SubscriptionForm = mongoose.model('SubscriptionForm', schema, 'subscription-form')
  return SubscriptionForm
}
