module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Cities', {
        id: {
         type: Sequelize.INTEGER,
         primaryKey:true,
         autoIncrement:true
        },
        file:{
            type: Sequelize.STRING,
            allowNull:false
        },
        city: {
            type: Sequelize.STRING
        },
        latitude: {
            type:Sequelize.FLOAT
        },
        longitude:{
            type:Sequelize.FLOAT
        },
        country: {
            type:Sequelize.STRING
        },
        citycode: {
            type:Sequelize.STRING
        },
        density: {
            type:Sequelize.DECIMAL
        },
        timezone: {
            type: Sequelize.STRING
        }
    });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Cities');
    }
  };