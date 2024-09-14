const isAdmin = (req, res, next) => {
    if (!req.auth.admin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
}

export default isAdmin;
