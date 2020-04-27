//const { validationResult } = require('express-validator')
const Employer = require('../../models/Employer')

module.exports = {
  async register(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array() })
      }
      const { email, name, password } = req.body
      const employer = await Employer.create({
        email,
        name,
        password
      })
      const accessToken = await employer.generateToken()
      res.status(201).json({
        statusCode: 201,
        employer,
        accessToken: `JWT ${accessToken}`,
        expiresIn: '12h'
      })
    }
    catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
    }
  },
  
  async login(req, res) {
    const employer = req.user
    const accessToken = await employer.generateToken()
    await employer.save({
      accessToken: accessToken
    })

    res.json({
      statusCode: 200,
      employer,
      accessToken: `JWT ${accessToken}`,
      expiresIn: '12h'
    })
  },

  async updateAccount(req, res) {
    try{
      const updateFields = {}
      for(const ops of req.body){
          updateFields[ops.propName] = ops.value
      }
      const result = await employer.update({ where: {
          id: req.params.id}}, {$set: updateFields})
     res.status(200).json({
    "message": "Account Details Updated",
          statusCode: 200,
          result
      })
    }
    catch(err){
     console.log(err)
      res.status(500).send('Server Error')
    }
  },

  async deleteAccount(req, res) {
    try {
      const account = await employer.destroy({
          where: {id: req.params.id}
      })
      if (!account) {
        return res.status(404).json({
          message: 'Account Not Found',
        })
      }
      res.status(200).json({
        message: 'Account Deleted',
      })
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error')
    }
  }
  
}