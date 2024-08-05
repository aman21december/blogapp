const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false}
    ,
    image: {
        type: DataTypes.STRING, // Store the image path as a string
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }, 
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON, // Using JSON for MySQL.
        allowNull: true
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Post;
