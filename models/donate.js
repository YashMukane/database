module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Donar", {
      mobileno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foodDetail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      


    }, {
        timestamps: false,
    });
};