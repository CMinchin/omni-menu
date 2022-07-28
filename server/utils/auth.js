const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  console.log(req.method, "request to", req.path, "\n", req.body);
  var loggedIn = false;
  if (req.session) {
    console.log(req.session);
    loggedIn = true;
  }
  if (!loggedIn) {
    res.status(401).send({logged_in: false});
  } else {
    next();
  }
};


const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

function signToken ({ email, username, _id }) {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}


module.exports = {withAuth, signToken};
