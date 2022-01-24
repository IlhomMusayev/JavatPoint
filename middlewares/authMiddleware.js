module.exports = function AuthMiddleware(req, res, next) {
  if (!req.session) {
      res.redirect('/admin/login');
    } else {
      next();
  }
};