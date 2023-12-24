const jwt = require('jsonwebtoken');
const { development } = require('../config/config');

const authentication = (req, res, next) => {
  try {
    if(req.body.type === "user" || !req.body.type) {
      // const token = req.header('Authorization');
      const token = req.cookies.Authorization;

      if (!token) {
        return res.status(401).json({error: 'Access Denied.No Token Provided.'})
      }

      jwt.verify(token, development.jwtPrivateKey, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid Token.' });
        }
        req.user = user;
        if (req.body.type === "user") {
          admin(req, res);
        }
      });
    }
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const admin = (req, res, next) => {
  if (!req.user || req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  } else if(!req.originalUrl.includes('register')){
    next();
  }
};

module.exports = { authentication, admin};