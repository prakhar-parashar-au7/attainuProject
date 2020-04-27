const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const Freelancer = require('./models/Freelancer')
const Employer = require('./models/Employer')

passport.use( 'freelancer-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const freelancer = await Freelancer.findByEmailAndPassword(email, password)
        if (!freelancer) return done(null, false, { message: 'Incorrect Credentials' })
        return done(null, freelancer)    
      } catch (err) {
        if (err.name === 'AuthError')
          done(null, false, { message: err.message })
        done(err)
      }
    }
  )
)

passport.use('employer-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const employer = await Employer.findByEmailAndPassword(email, password)
        if (!employer) return done(null, false, { message: 'Incorrect Credentials' })
        return done(null, employer)    
      } catch (err) {
        if (err.name === 'AuthError')
          done(null, false, { message: err.message })
        done(err)
      }
    }
  )
)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    req => req.cookies.accessToken
  ]),
  secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use('freelancer-jwt',
  new JWTStrategy(jwtOptions, async ({ id }, done) => {
    try {
      const freelancer = await Freelancer.findByPk(id)
      if (!freelancer) return done(null, false, { message: 'Incorrect Credentials' })
      done(null, freelancer)
    } catch (err) {
      if (err.name === 'Error') {
        done(err)
      }
    }
  })
)

passport.use('employer-jwt',
  new JWTStrategy(jwtOptions, async ({ id }, done) => {
    try {
      const employer = await Employer.findByPk(id)
      if (!employer) return done(null, false, { message: 'Incorrect Credentials' })
      done(null, employer)
    } catch (err) {
      if (err.name === 'Error') {
        done(err)
      }
    }
  })
)
