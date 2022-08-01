const router = require('express').Router();
const {User, Item, Tag} = require('../models/index');

const { Password } = require('../models');

router.post("/login", async (req, res) => {
  User.findOne({username: req.body.username})
    .then((user)=>{
      if (user) {
        if (user.password == req.body.password) {
          res.send("verified");
          return;
        }
      }
      res.status(401).send("usernameo or password incorrect");
      console.log(user);
    }).catch((user)=>{
      console.log(user);
    });
  res.send(req.body);
});

router.get('/', async (req, res) => {
  const loggedIn = false;
  if (req.session) {
    console.log(router.session);
    loggedIn = req.session.logged_in;
  }
  if(loggedIn){
    res.redirect('/password');
  }else{
    res.redirect('/login');
  }
});



router.get('/password', async (req, res) =>{

  // get all the current logged in user password
  const passwords = await Password.findAll({
    where: {
      user_id: req.session.user_id,
    }
  })

  console.log(passwords);

  const passwordData = passwords.map(password => password.get({plain: true}));

  res.render('password/index', {
    logged_in: req.session.logged_in,
    passwords: passwordData,

  })
});
router.get('/password/new', async (req, res) => {
  res.render('password/new', {
    logged_in: req.session.logged_in,

  })
});

router.get('/password/delete/:id', async (req, res) => {

  // find and delete password by id
  const deleted = await Password.destroy({
    where: {
      id: req.params.id,
    }
  });

  res.redirect('/password');
});

router.post('/password/edit/:id', async (req, res) =>{
  // take in user input
  const payload = {
    name:req.body.name,
    username:req.body.username,
    password:req.body.password,
    website:req.body.website,
    user_id:req.session.user_id,
  };
  
  // update password record in db
  const password = await Password.findByPk(req.params.id);


  await password.update(payload);

  // redirect user to password index

  res.redirect('/password');
});

router.get('/password/edit/:id', async (req, res) => {
  // get the password by id
  const password = await Password.findByPk(req.params.id);

  // render password edit view
  res.render('password/edit', {
    password: password.get({plain: true}),
    logged_in: req.session.logged_in
  });
});

router.post('/password/new', async (req, res) => {


  // read the req data
  const payload = {
    name: req.body.name,
    username:req.body.username,
    password:req.body.password,
    website:req.body.website,
    user_id: req.session.user_id,
  }

  // save the password to db
  const created = await Password.create(payload);

  // redirect the user to password/index
  res.redirect('/password');
});

module.exports = router;
