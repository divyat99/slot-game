const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
};
