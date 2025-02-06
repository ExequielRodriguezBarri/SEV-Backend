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
    });
    return Flightplan;
}
