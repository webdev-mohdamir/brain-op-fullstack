import signUpValidator from "../validators/auth/signup.validator.js";
import User from "../models/user.model.js";
import _ from "lodash";
import { dbSecretFields, JWT_SECRET } from "../config/constant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { email, password, name, avatar } = req.body;
    const validateFields = signUpValidator({ email, password });

    if (validateFields !== true) {
      return res.status(400).json(validateFields);
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "User already exist with this email",
      });
    }

    if (avatar) {
      const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      avatar = buffer;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      avatar,
    });

    user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: _.omit(user.toObject(), dbSecretFields),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validateFields = signUpValidator({ email, password });

    if (validateFields !== true) {
      return res.status(400).json(validateFields);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist with this email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: _.omit(user.toObject(), dbSecretFields),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    delete req.token;
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
