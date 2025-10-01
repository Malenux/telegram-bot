module.exports = async (req, res, next) => {
  next()

  if (!req.ip || req.ip !== '::1') {
    try {
      const ipClient = req.ip.replace('::ffff:', '')
      const response = await fetch(`http://ip-api.com/json/${ipClient}`)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error fetching user tracking data:', error)
    }
  }
}
