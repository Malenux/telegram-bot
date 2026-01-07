module.exports = (redisClient, subscriberClient) => {
  require('./new-user.js').handleEvent(redisClient, subscriberClient)
}
