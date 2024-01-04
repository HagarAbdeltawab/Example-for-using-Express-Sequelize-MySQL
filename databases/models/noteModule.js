import {DataTypes} from "sequelize";
import connection from "../dbConnection.js";
import user from "./userModel.js";
const note =connection.define('note',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    content:{
        type: DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    } 
});
note.belongsTo(user, { foreignKey: 'userId' });
user.hasMany(note, { foreignKey: 'userId' });
export default note;