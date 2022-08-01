const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const restRoutes = require('./restRoutes');

router.use(homeRoutes);
router.use(userRoutes);
router.use(restRoutes);

module.exports = router;
