// post models

module.exports = (sequelize,DataTypes) => {
    const Post =sequelize.define('posts',{
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:"users",
                key: "id"
            }
          },
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          body: {
            type: DataTypes.TEXT,
            allowNull: false
          }
    })
    return Post
}