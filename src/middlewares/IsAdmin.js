const isAdmin = (req, res, next) => {
    if (!req.auth.admin) {
        res.status(401).send({ message: 'Unauthorized' });
    }
    else {
        next();
    }
}

export default isAdmin;
