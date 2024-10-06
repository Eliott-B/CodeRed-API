const authClient = async (req, res, next) => {
    if (! req.params.token === process.env.AUTH_PASS) {
        res.status(401).send({ message: 'Unauthorized' });
    }
    else {
        next();
    }
};

export default authClient;
