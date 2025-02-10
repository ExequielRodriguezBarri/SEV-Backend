module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        fName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lName: {
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
        semesters_from_graduation: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 8,
        },


        points_awarded: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    return Student;
};
