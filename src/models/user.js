"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      userName: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      avatar: DataTypes.STRING,
      backGround: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      isPublish: DataTypes.BOOLEAN,
      delete: DataTypes.BOOLEAN,
      refreshToken: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  User.associate = function (models) {
    models.User.belongsTo(models.Role, { foreignKey: "roleId" });
  };

  return User;
};
