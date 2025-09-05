import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"
 const token = req.cookies.accessToken;
 console.log(req.cookies)
  if (!token) {
    return res.status(401).json({ success: false, error: "No token provi   ded" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // decode token
    if(user.role=="organizer") {
      req.user = user; // attach decoded payload to request
next(); // move to the next middleware/controller
    }else return res.status(403).json({ success: false, error: "Unauthoeized user" });
   
    
  } catch (error) {
    return res.status(403).json({ success: false, error: "Invalid token" });
  }
};
