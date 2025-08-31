import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // decode token
    req.user = user; // attach decoded payload to request
    next(); // move to the next middleware/controller
  } catch (error) {
    return res.status(403).json({ success: false, error: "Invalid token" });
  }
};
