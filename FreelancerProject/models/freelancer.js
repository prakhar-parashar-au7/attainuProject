const sequelize = require("../db");

const { Sequelize, Model } = require("sequelize");

const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class Freelancer extends Model {
    static async findByEmailAndPassword(email, password){

try {
    const freelancer = await Freelancer.findOne({
        where: {
            email
        }
     });
    if (!freelancer) throw new Error('Incorrect Credentials')
    const isMatched = await bcrypt.compare(password, freelancer.password);
    if (!isMatched) throw new Error('Incorrect Credentials');
    return freelancer;
  } catch (err) {
    err.name = 'AuthError'
    throw err
  }
}

async generateToken() {
    const freelancer = this
    const accessToken = sign({ id: freelancer._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '12h'
    })
    freelancer.accessToken = accessToken
    await freelancer.save()
    return accessToken
  }

    toJSON(){
    const freelancer = this.toObject()
    delete freelancer.password
    delete freelancer.accessToken
    delete freelancer.__v
    return freelancer
}
}


const freelancerSchema = {
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
      profile: {
        type: sequelize.STRING,
        references : {
          Model: 'freelancerProfile',
          key: "id"
      }
    }
  }

    Freelancer.init(freelancerSchema, {
        sequelize,
        tableName: "freelancer"
    });

    Freelancer.beforeCreate(async freelancer => {
      const hashedPassword = await bcrypt.hash(freelancer.password, 10)
      freelancer.password = hashedPassword
    });

    Freelancer.beforeUpdate(async freelancer => {
      if (freelancer.changed("password")) {
        const hashedPassword = await hash(freelancer.password, 10);
        freelancer.password = hashedPassword;
      }
    });  

    module.exports = Freelancer;


  

  
