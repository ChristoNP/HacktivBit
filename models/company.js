"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Category);
      Company.hasMany(models.Investment);
    }

    static async search(name) {
      let data;
      if (name) {
        data = await Company.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
      } else {
        data = await Company.findAll();
      }
      return data;
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      location: DataTypes.STRING,
      email: DataTypes.STRING,
      description: DataTypes.STRING,
      stockPrice: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
