module.exports = {
   usersOnly: (req, res, next) => {
      if (req.session.user) {
         next();
      } else {
         res.status(401).json({message: 'Please log in.'});
      }
   },
   adminsOnly: (req, res, next) => {
      const {isAdmin} = req.session.user;
      if (isAdmin === false) {
         res.status(403).json({message: "You are not an admin."});
      }
      next();
   }
}