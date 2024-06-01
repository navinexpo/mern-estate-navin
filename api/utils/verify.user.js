import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// we are checking token cookie. need to install cookie-parser and config cookie-parser in index.js
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Received token:", token);

  //   if (!token)
  //     return res.status(401).json({ message: "You are not authenticated!" });
  if (!token) {
    console.log("No token found in cookies");
    return next(errorHandler(401, "Unauthorized"));
  }

  //check if token correct or not
  // user - getting data here
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Error verifying token:", err);
      return next(errorHandler(403, "Forbidden"));
    }
    console.log("Verified User",user)
    //we want to send an information and get the id here
    req.user = user;
    console.log(req.user);
    next(); //save it once you get it. and go to the next session that is updateUser.
  });
};
