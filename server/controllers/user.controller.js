import User from "../models/user.model.js";
import _ from "lodash";
import { dbSecretFields } from "../config/constant.js";

export const profileController = async (req, res) => {
  try {
    const { user_id } = req.sessionUser;

    if (!user_id) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: _.omit(user.toObject(), dbSecretFields) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
