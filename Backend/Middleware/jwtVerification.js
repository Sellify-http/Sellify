const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).send('Access Denied. Token not found.');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied. Token not found.');
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedToken; // Attach the verified token to the request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        return res.status(400).send('Invalid Token.');
    }
};

module.exports = verify;
