export function isAuth({ redirect = false } = {}) {
  return function (req, res, next) {
    const Logged = !!req.session.user;

    if (redirect && Logged) {
      return res.redirect('/');
    }

    if (!Logged && !redirect) {
      if (req.headers.accept?.includes("application/json") || req.xhr) {
        return res.status(401).json({ authenticated: false });
      }
      return res.redirect('/login');
    }

    next();
  };
}

export default isAuth