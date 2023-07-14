const roles = (requestAllow) => (req, res, next) => {
    console.log(req.user)
  if (!requestAllow.includes(req.user.role)) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  next();
};
module.exports = roles;
