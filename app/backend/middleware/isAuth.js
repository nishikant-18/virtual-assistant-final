import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // 1. Let's see EXACTLY what the token is in the backend console
    console.log("=== AUTH DEBUG ===");
    console.log("Token value:", token);
    console.log("Token type:", typeof token);

    // 2. Check if token is missing
    if (!token) {
      console.log("Result: No token found. Returning 401.");
      return res.status(401).json({ message: "token not found" }); // Switched to 401 (Unauthorized)
    }

    // 3. Check if token is accidentally an object/array
    if (typeof token !== "string") {
      console.log("Result: Token is not a string! It's a", typeof token);
      return res.status(401).json({ message: "invalid token format" });
    }

    // 4. Verify token (Note: jwt.verify is synchronous, so 'await' is not needed)
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "is Auth error" }); // Switched to 401 
  }
};

export default isAuth;