const admin = require("../config/firebase-config.js");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return next();
    } else {
      return res.status(403).send("invalid credentials");
    }
  } catch {
    return res.status(500).send("internal error");
  }
};
