'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Register, { foreignKey: 'eventId' });
    }
  }
  Event.init({
    eventName: 
    {
    type: DataTypes.STRING,
    unique:true
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};