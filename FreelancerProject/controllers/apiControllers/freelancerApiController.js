const freelancerProfile = require('../../models/FreelancerProfile')
const Order = require('../../models/Order')

module.exports = {
    async addDetails(req, res) {
        try{
            const { 
                name,
                email,
                services,
                expertiseLevel, 
                description, 
                skills, 
                education, 
                employment, 
                languages, 
                location, 
                hourlyRate
            } = req.body

            const profileImage = req.file.path

            if(
                !name ||
                !email ||
                !services ||
                !expertiseLevel ||
                !description ||
                !skills ||
                !education ||
                !employment ||
                !languages ||
                !location ||
                !hourlyRate
            ) {
              return res
                .status(400)
                .send({
                  statusCode: 400,
                  message: 'Looks like some fields are incomplete'
                })
            }
            const freelancerDetails = await freelancerProfile.create({
                name,
                email,
                services,
                expertiseLevel,
                description,
                skills,
                education,
                employment,
                languages,
                location,
                hourlyRate,
                profileImage,
            })  
            res.status(201).json({
                statusCode: 201,
                freelancerDetails
              })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },


    async viewProfile(req, res) {
        try{
            const profile = await freelancerProfile.findByPk(req.params.freelancerid)
            if(!profile){
                return res.status(404).json({
                    "message": "Profile Not Found"
                })
            }
            res.status(200).json({
                statusCode: 200,
                profile
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async updateProfile(req, res) {
        try{
            const updateFields = {}
            for(const ops of req.body){
                updateFields[ops.propName] = ops.value
            }
            const result = await freelancerProfile.update({
                updateFields,
                where:
                {id: req.params.freelancerid}})
            res.status(200).json({
                "message": "Profile Updated",
                statusCode: 200,
                result
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async deleteProfile(req, res) {
        try{
            const profile = await freelancerProfile.destroy({ where: 
                {id: req.params.freelancerid}})
            if(!profile){
                return res.status(404).json({
                    "message": "Profile Not Found"
                })
            }
            res.status(200).json({
                "message": "Profile Deleted"
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async checkout(req, res) {
        try{
            const employer = req.params.employerid
            const freelancer = req.user._id
            if(!employer || !freelancer){
                return res.status(404).json({
                    'message': 'Invalid Credentials'
                })
            }
            const order = await Order.create({
                employer,
                freelancer                
            })
            res.status(201).json({
                statusCode: 201,
                order
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }   
    }
}