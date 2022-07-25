const router = require('express').Router();

const apiRoutes = require('./api');
const webRoute = require('./homeRoutes');
const authRoute = require('./authRoutes');

// ???? -- is this needed
// const websiteRoutes = require('./website');

router.use('/api', apiRoutes);
router.use(webRoute);
router.use(authRoute);
// router.use('/website', websiteRoutes);

module.exports = router;
