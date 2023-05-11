const jwt = require("jsonwebtoken");
const SECRET_KEY = `Dermanbuster123`;

const getUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: `Please authenticate using valid token` });
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: `Please authenticate using valid token` });
  }
};

module.exports = getUser;
