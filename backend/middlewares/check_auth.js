const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodeToken.email, userId: decodeToken._id, role: decodeToken.role };
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: "Auth Failed"
    })
  }
}