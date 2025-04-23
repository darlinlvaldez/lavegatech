export function isAuth(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

export default isAuth