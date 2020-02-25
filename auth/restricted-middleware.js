module.exports = (req, res, next) => {
  if(req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({messsage: 'You can not pass!'})
  }
};
