const { Router } = require('express')
const passport = require('passport')
const upload = require('../../multer')
const { addDetails, viewAllFreelancers, viewProfile, updateProfile, deleteProfile, checkout } = require('../../controllers/apiControllers/freelancerApiControllers')

const router = Router()

router.post(
    '/profile/add',
    passport.authenticate('freelancer-jwt', { session: false }),            
    upload.single('profileImage'), 
    addDetails)

router.get(
    '/profile/viewAll',
    viewAllFreelancers)

router.get(
    '/profile/view/:freelancerid',
    viewProfile
)

router.patch(
    '/profile/update/:freelancerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    updateProfile
)

router.delete(
    '/profile/delete/:freelancerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    deleteProfile
)

router.post(
    '/checkout/acceptJob/:employerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    checkout
)

module.exports = router