const { Router } = require('express')
const passport = require('passport')
const { check } = require('express-validator')
const { register, login, updateAccount, deleteAccount } = require('../../controllers/normalControllers/freelancerNormalControllers')

const router = Router()

router.post('/freelancer/register',[
  check('name', 'Please enter a UserName').notEmpty(),
  check('email', 'Invalid Email').notEmpty().isEmail(),
  check('password', 'Password is too short').notEmpty().isLength({ min: 5})
], register)

router.post(
  '/freelancer/login',
  passport.authenticate('freelancer-local', { session: false }),
  login
)

router.patch(
  '/freelancer/update/:freelancerid',
  passport.authenticate('freelancer-jwt', { session: false }),
  updateAccount
)

router.delete(
  '/freelancer/delete/:freelancerid',
  passport.authenticate('freelancer-jwt', { session: false }),
  deleteAccount
)

module.exports = router
