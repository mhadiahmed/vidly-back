const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied not token Provided.');

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivatekey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('invalid token.')
    }
}
