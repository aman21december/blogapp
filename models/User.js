const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
sequelize.sync().then(() => {
    console.log('user table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports = User;
