module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        graduation_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        points_awarded: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
  
    return Student;
};
