const { Router } = require('express')
const passport = require('passport')
const { check } = require('express-validator')
const { register, login, updateAccount, deleteAccount } = require('../../controllers/normalControllers/employerNormalControllers')

const router = Router()

router.post('/employer/register',[
  check('name', 'Please enter a UserName').notEmpty(),
  check('email', 'Invalid Email').notEmpty().isEmail(),
  check('password', 'Password is too short').notEmpty().isLength({ min: 5})
], 
register)

router.post(
  '/employer/login',
  passport.authenticate('employer-local', { session: false }),
  login
)

router.patch(
  '/employer/update/:employerid',
  passport.authenticate('employer-jwt', { session: false }),
  updateAccount
)

router.delete(
  '/employer/delete/:employerid',
  passport.authenticate('employer-jwt', { session: false }),
  deleteAccount
)

module.exports = router