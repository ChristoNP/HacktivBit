'use strict';
const {
  Model
} = require('sequelize');
const Company = require('./company')
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.belongsTo(models.User)
      Investment.belongsTo(models.Company)
    }
    get caption() {
      return `${this.name} / ${this.investmentType}`
    }
  }
  Investment.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    investmentType: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};