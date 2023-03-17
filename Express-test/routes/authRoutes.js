const router = require('express').Router();
const { login_post, signup_post } = require('../controllers/AuthController')

router.post('/login', login_post);
router.post('/signup', signup_post);

module.exports = router;