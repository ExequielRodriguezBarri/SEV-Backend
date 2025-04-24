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
            allowNull: true
        },
        points_awarded: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        approved_by:{
            type: Sequelize.INTEGER
        },
        file: {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        },
        reflection_text: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        fileMimeType: {   
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        timestamps: false
    });
    return flightplanTask;
};

