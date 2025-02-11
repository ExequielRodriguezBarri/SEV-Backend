module.exports = (sequelize, Sequelize) => {
    const flightplanTask = sequelize.define("flightplan_task", {
        plan_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        task_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        completion_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        points_awarded: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        approved_by:{
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });
    return flightplanTask;
};

