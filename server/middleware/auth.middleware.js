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

  next();
};
