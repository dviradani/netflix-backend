import jwt from "jsonwebtoken";

//Generates a token
export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.JWT_PASSWORD,
    { expiresIn: "15d" }
  );
};

//Check if given token is valid
export const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: "No Token" });
  }
};
