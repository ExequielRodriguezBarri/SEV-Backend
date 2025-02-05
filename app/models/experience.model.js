module.exports = (sequelize, Sequelize) => {
    const Experience = sequelize.define("experience", {
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reflection_required: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      scheduling_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rationale: {
        type: Sequelize.STRING,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    return Experience;
};