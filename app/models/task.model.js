module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        required_task: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        category: {
            type: Sequelize.STRING,
            allowNull: false

        },

        semesters_from_graduation: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 8
        },


        type: {
            type: Sequelize.STRING,

            allowNull: false
        },
        reflection_required: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        scheduling_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rationale: {
            type: Sequelize.STRING,
            allowNull: false
        },
        points: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    return Task;
};