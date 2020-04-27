const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

const freelancerProfileSchema = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false
    },

    services: {
        type: Sequelize.ARRAY,
        defaultValue: undefined,
        allowNull: false
    },

    expertiseLevel: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true
    },

    skills: {
        type: Sequelize.ARRAY,
        defaultValue: undefined,
        allowNull: false
    },

    education: {
        type: Sequelize.STRING,
    },

    employment: {
        type: Sequelize.STRING,
    },

    languages: {
        type: Sequelize.ARRAY,
        defaultValue: undefined,
        allowNull: false
    },
     
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    hourlyRate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    profileImage: {
        type: String,
        allowNull: false
    },

    ratings: {
        type: Sequelize.INTEGER
    },

    freelancer: {
        type: offscreenBuffering,
        references: {
            Model: 'freelancer',
            key: "id"
        
    }
}
}


FreelancerProfile.init(freelancerProfileSchema, {
    sequelize,
    tableName: "freelancerProfile",
});


module.exports = FreelancerProfile;

