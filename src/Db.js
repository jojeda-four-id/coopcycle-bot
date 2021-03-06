var Sequelize = require('sequelize');

var listeners = [];

module.exports = function(sequelize) {

  var Courier = sequelize.define('courier', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    token: Sequelize.STRING,
    refreshToken: Sequelize.STRING,
    lastPosition: Sequelize.STRING,
    speedFactor: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  }, {
    getterMethods: {
      lastPosition : function() {
        var lastPosition = this.getDataValue('lastPosition');
        if (lastPosition) {
          return JSON.parse(lastPosition);
        }
      }
    },
  });

  var Routine = sequelize.define('routine', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
  });

  Courier.belongsTo(Routine);

  return {
    Courier: Courier,
    Routine: Routine
  };
}