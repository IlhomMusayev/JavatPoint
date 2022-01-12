
const { checkToken } = require("../modules/jwt");

module.exports = async function userMiddleware(req, res, next) {
    try {
        let token = req.cookies.token;
        if (!token) {
            throw new Error(401, 'Token not found');
        }

        token = checkToken(token)

        if (!token) {
            throw new Error(401, 'Token not valid');
        }

        const user = await req.db.admins.findOne({
            where: {
                user_id: token.id,
            },
            raw: true,
        });
        // console.log(user);
        req.user = await user;

        next()
    } catch (error) {
        next()
    }
}