const { DataTypes } = require("sequelize");


// users model

module.exports = (sequelize,DataTypes) => {
   
    const Users = sequelize.define("users",{
     id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     name:{
        type:DataTypes.STRING,
        allowNull: false,
     },
     username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.JSON, // Store address as JSON object
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.JSON, // Store address as JSON object
        allowNull: false,
      },


    })

    return Users

}