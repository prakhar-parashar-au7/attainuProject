const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class Employer extends Model {

    static async findByEmailAndPassword(email, password){

    try {
      const employer = await Employer.findOne({
          where: {
              email
          }
       });
      if (!employer) throw new Error('Incorrect Credentials')
      const isMatched = await bcrypt.compare(password, employer.password)
      if (!isMatched) throw new Error('Incorrect Credentials')
      return employer
    } catch (err) {
      err.name = 'AuthError'
      throw err
    }
  }
  
  async generateToken() {
    const employer = this
    const accessToken = sign({ id: employer._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '12h'
    })
    employer.accessToken = accessToken
    await employer.save()
    return accessToken
  }
  
    toJSON() {
    const employer = this.toObject()
    delete employer.password
    delete employer.accessToken
    delete employer.__v
    return employer
  }

}

const employerSchema = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accessToken: {
        type: Sequelize.STRING

    },
    jobs: {
        type: sequelize.STRING,
        references: {
          model: "employerJob",
          key: "id",
        },
        
    },
};


Employer.beforeSave(async employer => {
   const hashedPassword = await bcrypt.hash(freelancer.password, 10)
    employer.password = hashedPassword
  });

Employer.beforeUpdate(async employer => {
   if (employer.changed("password")) {
   const hashedPassword = await hash(employer.password, 10);
      employer.password = hashedPassword;
    }
  });  

Employer.init(employerSchema, {
  sequelize,
  tableName: "employers"
})  

module.exports = Employer

