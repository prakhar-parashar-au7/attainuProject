const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

const orderSchema = {

freelancer: {
    type: Sequelize.STRING,
    references: {
        Model: "freelancer",
        key: "id"
    }
},

employer: {
    type: Sequelize.STRING,
    references: {
        Model: "employer",
        key: "id"
    }
},

 isCompleted: {
     type: Boolean,
 }   

}    
    

Order.init(orderSchema, {
    sequelize,
    tableName: "Orders"
})


module.exports = Order;