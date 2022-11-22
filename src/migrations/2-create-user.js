"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fullName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      userName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      backGround: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      isPublish: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
