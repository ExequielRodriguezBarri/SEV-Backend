module.exports = (sequelize, Sequelize) => {
    const task_preReq = sequelize.define("task_preReq", {
        task_id: {
            type: Sequelize.INTEGER,
        },
        preReq_id: {
            type: Sequelize.INTEGER,
        }
    },{
        timestamps: false
    });
    return task_preReq;
};