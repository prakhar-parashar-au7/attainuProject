const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");


const ticketSchema = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
}

Ticket.init(ticketSchema, {
    sequelize,
    tableName: "tickets"
});

module.exports = Ticket;