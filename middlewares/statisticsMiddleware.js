var geoip = require('geoip-lite');
const url = require('url');

module.exports = async function statisticsMiddleware(req, res, next) {
    try {
        const ip = req.ip
        const user_agent = req.headers["user-agent"];

        const user = await req.db.guests.findOne({
            where: {
                guest_ip: ip,
            }
        })
       if (!user) {
           await req.db.guests.create({
                guest_ip: ip,
                guest_agent: user_agent
           }) 
           next()
       }
        next()
    } catch (error) {
        next()
    }
}