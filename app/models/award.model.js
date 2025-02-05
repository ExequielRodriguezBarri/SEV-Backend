module.exports = (sequelize, Sequelize) => {
    const Award = sequelize.define("award", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      redemption_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      redemption_info: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });
    return Award;
};