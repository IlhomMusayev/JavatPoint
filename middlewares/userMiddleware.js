
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

       
		const session = await req.db.sessions.findOne({
			where: {
				session_id: token.session_id,
			},
			include: req.db.users,
			raw: true,
		});

		if (!session) {
			throw new res.error(401, "Session isn't found");
		}

        // console.log(user);
        req.session = await session;    

        next()
    } catch (error) {
        next()
    }
}