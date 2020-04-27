const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

const employerJobSchema = {

    name: {
        type: Sequelize.STRING,
        allowNUll: false
      },

    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNUll: false
      },

    title: {
        type: Sequelize.STRING,
        allowNUll: false,
      },

    category: {
          type: Sequelize.STRING,
          allowNUll: false
      },

    description: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      budget: {
        type: Sequelize.INTEGER,
        allowNUll: false
      },

      duration: {
          type: Sequelize.INTEGER,
      },

      timeRequirement: {
          type: Sequelize.INTEGER
      },

      projectFile: {
        type: Sequelize.STRING
      },

      employer: {
          type: Sequelize.INTEGER,
          references: {
            model: "employer",
            key: "id",
          }
        }


 

}

EmployerJob.init(employerJobSchema, {
  sequelize,
  tableName: "employerJobs"
}) 


module.exports = EmployerJob;