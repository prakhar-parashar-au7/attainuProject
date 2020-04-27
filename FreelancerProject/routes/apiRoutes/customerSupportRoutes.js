const { Router } = require('express')
const { generateTicket, homeRoute } = require('../../controllers/apiControllers/customerSupportControllers')

const router = Router()

router.post(
    '/generateTicket',
    generateTicket
)

router.get(
    '/',
    homeRoute
)

module.exports = router