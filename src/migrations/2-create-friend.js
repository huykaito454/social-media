"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Friends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sourceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      targetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      requestDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      approveDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deniedDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      terminationDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      terminator: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Friends");
  },
};
