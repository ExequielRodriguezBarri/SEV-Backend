module.exports = (sequelize, Sequelize) => {
    const Badge = sequelize.define("badge", {
      name: {
        type: Sequelize.STRING,

        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
     
    });
    return Badge;

};