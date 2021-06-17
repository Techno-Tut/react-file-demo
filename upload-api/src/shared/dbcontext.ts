import {Sequelize} from "sequelize"

const sequelize = new Sequelize('demo', 'sa', 'test@123', {
    host: 'database',
    dialect: 'mssql'
  });

export default sequelize;