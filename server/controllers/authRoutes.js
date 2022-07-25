// 

const {User} = require('./..//models')

const router = require('express').Router();

router.get('/signup', (req, res) => {

  res.render('signup');

});



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/password');
    return;
  }

  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .render('login', {
          error: 'Incorrect email or password, please try again'
        });

      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .render('login', {
          error: 'Incorrect email or password, please try again'
        });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.redirect('/password');
    });

  } catch (err) {
    res
        .render('login', {
          error: 'Unknown error, please contact Cam at 123456, please try again'
        });
  }
})

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
          name: req.body.email,
          email: req.body.email,
          password: req.body.password,
        });
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
    
          res.render('password/index', {
            logged_in: req.session.logged_in,
          })
        });
      } catch (err) {
        console.log(err);
        res.render('signup', {
          error: "Cannot create user",
        });
      }
})

router.get('/logout', (req, res) => {

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/')
    });
  } else {
    res.redirect('/');
  } 

});

module.exports = router;

