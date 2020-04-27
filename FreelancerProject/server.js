const express = require('express')
const passport = require('passport')
require('dotenv').config()
require('./db')
require('./passport')

const freelancerNormalRoutes = require('./routes/normalRoutes/freelancerNormalRoutes')
const employerNormalRoutes = require('./routes/normalRoutes/emoployerNormalRoutes')
const freelancerApiRoutes = require('./routes/apiRoutes/freelancerApiRoutes')
const employerApiRoutes = require('./routes/apiRoutes/employerApiRoutes')
const customerSupportRoutes = require('./routes/apiRoutes/customerSupportRoutes')

const app = express()

app.use(express.json())
app.use(passport.initialize())

app.use(freelancerNormalRoutes)
app.use(employerNormalRoutes)
app.use(freelancerApiRoutes)
app.use(employerApiRoutes)
app.use(customerSupportRoutes)

app.listen(process.env.PORT || 3000, function() {
  console.log('Server started')
})
