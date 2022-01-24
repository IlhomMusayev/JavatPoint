const redis = require("redis")
const REDIS_PORT = process.env.REDIS_PORT

const client = redis.createClient(REDIS_PORT)

module.exports = async () => {
    return client
}
