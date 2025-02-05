module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
      },
      start_time: {
        type: Sequelize.TIME,
      },
      end_time: {
        type: Sequelize.TIME,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attendance_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      registration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      completion_type: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Event;
};