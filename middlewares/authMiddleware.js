module.exports = function AuthMiddleware(req, res, next) {
  if (!req.user) {
      res.redirect('/admin/login');
    } else {
      next();
  }
};