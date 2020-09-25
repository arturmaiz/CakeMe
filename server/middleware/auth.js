const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token)
      res.status(401).json({ msg: "No Token Authrization Denied 😢" });

    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token Is Not Valid 🤨 Please Login Again" });
  }
};

module.exports = auth;
