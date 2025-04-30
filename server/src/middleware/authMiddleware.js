import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Tidak ada token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
