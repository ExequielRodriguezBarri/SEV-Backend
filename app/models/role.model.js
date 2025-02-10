module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'student'
        }
    });
  

    return Role;
  };