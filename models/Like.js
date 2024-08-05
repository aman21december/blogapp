const sequelize = require("../config/database");
const {DataTypes}=require("sequelize");
const User = require("./User");
const Post = require("./Post");

const Like=sequelize.define('Likes',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: User,
            key:"id"
        },
    },
    post_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Post,
            key:"id"
        }
    },
    is_like:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},{
    tableName:'Likes',
    timestamps:true,
    indexes:[
        {
            unique:true,
            fields:['user_id','post_id']
        }
    ]
})

module.exports=Like;
