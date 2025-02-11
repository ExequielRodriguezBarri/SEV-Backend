module.exports = (sequelize, Sequelize) => {
    const Flightplan = sequelize.define('flightplan', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        semester: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        semesters_from_graduation: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        student_id: {
            type: Sequelize.INTEGER,
        },
    });
    return Flightplan;
}
