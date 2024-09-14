import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.auth = {
            groupUUID: decodedToken.groupUUID,
            admin: decodedToken.admin
        };
        next();
    } catch(err) {
        res.status(401).json(err);
    }
}

export default authUser;