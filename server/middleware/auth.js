// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// const authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//       return res.status(401).json({ error: "Authorization header is missing" });
//     }
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ error: "Access denied, token missing!" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(decoded.userId);
//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: "Invalid token or user does not exist" });
//     }
//     req.user = { userId: user.id };
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// module.exports = authenticate;
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;  // Attach user data to the request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
