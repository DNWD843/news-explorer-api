const router = require('express').Router();
const { getUserData } = require('../controllers/users');
const { getUserDataReqValidator } = require('../middlewares/usersValidators');

router.get('/me', getUserDataReqValidator, getUserData);

module.exports = router;
