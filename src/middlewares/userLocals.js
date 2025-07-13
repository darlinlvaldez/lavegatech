export function userLocals(req, res, next) {
  res.locals.usuario = req.session.user;
  next();
}

export function adminLocals(req, res, next) {
  res.locals.admin = req.session.admin;
  next();
}