import User from "../models/user.model.js";
import validateJwt from "../lib/valdateJwtToekn.js";
import _ from "lodash";
import { dbSecretFields } from "../config/constant.js";

export const profileController = async (req, res) => {
  try {
    const result = validateJwt(req.token);

    if (!result || !result.valid) {
      return res.status(401).json({ error: result.error });
    }

    const user = await User.findById(result.decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: _.omit(user.toObject(), dbSecretFields) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
