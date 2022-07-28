const router = require('express').Router();
const { Password } = require('../../models');

// router.post('/', async (req, res) => {
//   try {
//     const newProject = await Password.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const projectData = await Password.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// retrieve all passwords from acc that you are logged in as
router.get('', async (req, res) => {
  try {
    const passwordsData = await Password.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const passwords = passwordsData.get({ plain: true });


    if (!passwords) {
      res.status(404).json([]);
      return;
    }

    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json(err);
  }
});

// retrieve specific password from acc you are logged in as 
router.get('/:id', async (req, res) => {
  try {
    const passwordsData = await Password.findAll({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    const passwords = passwordsData.get({ plain: true });


    if (!passwords) {
      res.status(404).json([]);
      return;
    }

    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add password to database
router.post('/', async (req, res) => {
  try {
    req.body.user_id = req.session.user_id
    const passwordsData = await Password.create(req.body);

    const passwords = passwordsData.get({ plain: true });


    if (!passwords) {
      res.status(404).json([]);
      return;
    }

    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// update password in database
router.post('/:id', async (req, res) => {
  console.log("congrats we got here");


  const payload = {
    name: req.body.name,
    username:req.body.username,
    password:req.body.password,
    website:req.body.website,
    user_id: req.session.user_id,
  }
  
  // update password record in db
  const password = await Password.findByPk(req.params.id);

  if (!password) {
    res.status(404).json([]);
    return;
  }

  try {
    await password.update(payload)
    



    res.status(200).json(password.get({plain: true}));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// delete password from database
router.patch('/:id', async (req, res) => {
  try {
    const passwordsData = await Password.destroy(req.body,{
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    const passwords = passwordsData.get({ plain: true });


    if (!passwords) {
      res.status(404).json([]);
      return;
    }

    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
