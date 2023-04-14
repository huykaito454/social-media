"use strict";
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    "Friend",
    {
      sourceId: DataTypes.STRING,
      targetId: DataTypes.STRING,
      requestDate: DataTypes.DATE,
      approveDate: DataTypes.DATE,
      deniedDate: DataTypes.DATE,
      terminationDate: DataTypes.DATE,
      terminator: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Friend.associate = function (models) {
    models.Friend.belongsTo(models.User, { foreignKey: "sourceId" });
    models.Friend.belongsTo(models.User, { foreignKey: "targetId" });
  };

  return Friend;
};
