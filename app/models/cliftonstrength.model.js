module.exports = (sequelize, Sequelize) => {
    const Cliftonstrength = sequelize.define("cliftonstrength", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
  
    return Cliftonstrength;
};
