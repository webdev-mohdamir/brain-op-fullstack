import validateJwt from "../lib/valdateJwtToekn.js";

export const authenticateReq = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader == undefined || bearerHeader == undefined) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;

  // validating token
  const result = validateJwt(req.token);

  if (!result || !result.valid) {
    return res.status(401).json({ error: result.error });
  }

  req.sessionUser = {
    user_id: result.decoded.id,
  };

  next();
};
