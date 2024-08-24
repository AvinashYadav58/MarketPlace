const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    console.log(authHeader);

    const token = authHeader // Assuming "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token is missing from Authorization header' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        console.log('decoded: ', decoded);

        // If token is valid, attach the decoded payload to the request object
        req.body.userId = decoded?.id;

        req.body.email = decoded?.email;

        next(); // Pass control to the next middleware
    });
};

module.exports = authorize;
