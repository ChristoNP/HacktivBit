'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Investment)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: 'Email Required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password Required'
        },
        notEmpty: {
          msg: 'Password Required'
        },
        charCheck(value) {
          if (value.length <= 4) {
            throw new Error('Password must be longer than 4 characters');
          }
        }
      }
    },
    
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
        instance.role = 'user'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};