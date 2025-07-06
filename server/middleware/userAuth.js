import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; 

    next();
  } catch (error) {
    
    if (error.name === 'TokenExpiredError') {
  return res.status(401).json({
    success: false,
    message: "Session expired. Please log in again.",
  });
}
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default userAuth;
