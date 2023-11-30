'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Register.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  Register.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    tShirtSize: DataTypes.STRING,
    nameOfTheBib: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    contactName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    acceptedTerms: DataTypes.BOOLEAN,
    eventId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Register',
  });
  return Register;
};