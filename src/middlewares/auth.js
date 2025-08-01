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

export function isAdmin({ redirect = false } = {}) {
  return function (req, res, next) {
    const Logged = !!req.session.admin;

    if (redirect && Logged) {
      return res.redirect('/admin/panel');
    }

    if (!Logged && !redirect) {
      if (req.headers.accept?.includes("application/json") || req.xhr) {
        return res.status(401).json({ authenticated: false });
      }
      return res.redirect('/admin/login');
    }

    next();
  };
}

export function requireRole(...allowedRoles) {
  return function (req, res, next) {
    if (!req.session.admin) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const { rol } = req.session.admin;

    if (!allowedRoles.includes(rol)) {
      return res.status(403).json({ error: "Acceso denegado: rol no autorizado" });
    }

    next();
  };
}