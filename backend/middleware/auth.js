module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      // res.redirect(`${process.env.BASE_URL}/login`)
      console.log('Not authenticated!!!!!')
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      // res.redirect(`${process.env.BASE_URL}/dashboard`)
    } else {
      return next()
    }
  }
}
