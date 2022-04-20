module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Token: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
        timestamps: false,
    });
};