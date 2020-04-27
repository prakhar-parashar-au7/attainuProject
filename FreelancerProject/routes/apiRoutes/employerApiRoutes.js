const { Router } = require('express')
const passport = require('passport')
const upload = require('../../multer')
const { createJob, viewAllJobs, viewJob, updateJob, deleteJob, checkout, createRating } = require('../../controllers/apiControllers/employerApiControllers')

const router = Router()

router.post(
    '/job/create',
    passport.authenticate('employer-jwt', { session: false }),            
    upload.single('projectFile'), 
    createJob)

router.get(
    '/job/viewAll',
    viewAllJobs)

router.get(
    '/job/view/:jobId',
    viewJob
)

router.patch(
    '/job/update/:jobId',
    passport.authenticate('employer-jwt', { session: false }),
    updateJob
)

router.delete(
    '/job/delete/:jobId',
    passport.authenticate('employer-jwt', { session: false }),
    deleteJob
)

router.post(
    '/checkout/hireFreelancer/:freelancerid',
    passport.authenticate('employer-jwt', { session: false }),
    checkout
)

router.post(
    '/reviews/:freelancerid',
    passport.authenticate('employer-jwt', { session: false }),
    createRating
)

module.exports = router