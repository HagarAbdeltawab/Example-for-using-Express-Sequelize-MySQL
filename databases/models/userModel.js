import {DataTypes} from "sequelize";
import connection from "../dbConnection.js"; 
const user = connection.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
export default user;