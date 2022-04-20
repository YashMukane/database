module.exports = (sequelize, DataTypes) => {
    return sequelize.define("donor", {
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
      userlocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull:true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull:true,
      }

    }, {
        timestamps: false,
    });
};