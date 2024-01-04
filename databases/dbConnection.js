import { Sequelize } from "sequelize"; 
const connection = new Sequelize('ormAssignment','root','',{
    host: 'localhost',
    dialect: 'mysql'
});
export default connection;