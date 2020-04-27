const { validationResult } = require('express-validator')
const Freelancer = require('../../models/Freelancer')

module.exports = {
    async register(req, res) {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ message: errors.array() })
        }
        const { email, name, password } = req.body
        const freelancer = await Freelancer.create({
          email,
          name,
          password
        })
        const accessToken = await freelancer.generateToken()
        res.status(201).json({
          statusCode: 201,
          freelancer,
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
      const freelancer = req.user
      const accessToken = await freelancer.generateToken()
      await freelancer.save({
        accessToken: accessToken
      })
      
      res.json({
        statusCode: 200,
        freelancer,
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
        const result = await freelancerProfile.update( 
            {where:
            {id: req.params.freelancerid}},
             {set: updateFields})
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
        const account = await freelancer.delete({ 
            where:{
          id: req.params.freelancerid}
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
