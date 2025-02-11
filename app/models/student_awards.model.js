module.exports = (sequelize, Sequelize) => {
    const StudentAward = sequelize.define("student_award", {
        student_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        award_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        completion_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        points_used: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false
    });
    return StudentAward;
};

