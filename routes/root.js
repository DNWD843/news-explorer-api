const router = require('express').Router();
const { handleRegister, handleLogin } = require('../controllers/users');
const { authorizationCheck } = require('../middlewares/auth');
const articlesRoutes = require('./articles');
const usersRoutes = require('./users');
const badRequestRoute = require('./badRequest');

router.post('/signup', handleRegister);
router.post('/signin', handleLogin);
router.use(authorizationCheck);
router.use('/articles', articlesRoutes);
router.use('/users', usersRoutes);
router.use('*', badRequestRoute);

module.exports = router;
