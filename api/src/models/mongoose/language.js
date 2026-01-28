module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      alias: String,
      selected: {
        type: Boolean,
      },
      default: {
        type: Boolean,
      },
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Languages = mongoose.model('Languages', schema, 'languages')
  return Languages
}
