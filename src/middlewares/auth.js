export function isAuth(req, res, next) {
  if (req.session.user) return next();

  if (req.headers.accept?.includes('application/json') || req.xhr) {
    return res.status(401).json({ authenticated: false });
  }

  res.redirect('/login');
}

export default isAuth