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
    firstName:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    profilePicture:{
        type:DataTypes.STRING,
        allowNull:true
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'user',
        allowNull:false
    },
    isBanned:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },
    emailNotification:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
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
