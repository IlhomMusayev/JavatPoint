// const client = require('../modules/redis')
const redis = require("redis")
const REDIS_PORT = process.env.REDIS_PORT

const client = redis.createClient(REDIS_PORT)

module.exports = async function statisticsMiddleware(req, res, next) {
    try {
        await client.connect();
        const ip = req.ip ;
        user = await client.get("*")

    } catch (error) {
        console.log(error)
        next(error)
    }
}