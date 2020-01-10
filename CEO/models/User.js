const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'user', 
    {
        user_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        funnel_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type:Sequelize.STRING
        },
        password: {
            type:Sequelize.STRING
        },
        identification_number: {
            type:Sequelize.STRING
        },
        email: {
            type:Sequelize.STRING
        },
        role: {
            type:Sequelize.STRING
        },
        phone: {
            type:Sequelize.STRING
        },
        message_yn: {
            type:Sequelize.BOOLEAN
        },
        dislike_genre: {
            type:Sequelize.STRING
        },
        wishlist: {
            type:Sequelize.STRING
        },
        noshow_count: {
            type:Sequelize.INTEGER
        },
        join_date: {
            type:Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        tableName: "user",
        timestamps: false
    }
)