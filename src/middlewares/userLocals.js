export default function userLocals(req, res, next) {
    res.locals.usuario = req.session.user;
    next();
  }  