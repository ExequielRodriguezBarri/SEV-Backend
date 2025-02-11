module.exports = (sequelize, Sequelize) => {
    const flightplanExperience = sequelize.define("flightplan_experience", {
        plan_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        experience_id: {
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
        },
        event_id:{
            type:Sequelize.INTEGER

        }
    }, {
        timestamps: false
    });
    return flightplanExperience;
};

