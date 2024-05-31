import { JWT_SECRET } from "../config/constant.js";
import jwt from "jsonwebtoken";

const validateJwt = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

export default validateJwt;
