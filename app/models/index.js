const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.award = require("./award.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.badge = require("./badge.model.js")(sequelize, Sequelize);
db.major = require("./major.model.js")(sequelize, Sequelize);
db.flightplan = require("./flightplan.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.student_award = require("./student_awards.model.js")(sequelize, Sequelize);
db.cliftonstrength = require("./cliftonstrength.model.js")(sequelize, Sequelize);
db.student_strength = sequelize.define("student_strength", {}, { timestamps: false });
db.student_badge = sequelize.define("student_badge", {}, { timestamps: false });
db.role_user = sequelize.define("role_user", {}, { timestamps: false });
db.flightplan_task = require("./flightplan_task.model.js")(sequelize, Sequelize);
db.flightplan_experience = require("./flightplan_experience.model.js")(sequelize, Sequelize);
db.experience_events = sequelize.define("experience_events", {}, { timestamps: false });
db.experience_strength = sequelize.define("experience_strength", {}, { timestamps: false });
db.experience_major = sequelize.define("experience_major", {}, { timestamps: false });
db.task_strength = sequelize.define("task_strength", {}, { timestamps: false });
db.task_major = sequelize.define("task_major", {}, { timestamps: false });
db.task_preReq = require("./task_preReq.model.js")(sequelize, Sequelize);
db.role_session = sequelize.define("role_session", {}, { timestamps: false });


db.student_award.belongsTo(db.student, { foreignKey: 'student_id' });
db.student_award.belongsTo(db.award, { foreignKey: 'award_id' });

db.student_strength.belongsTo(db.student, {through: 'student_strength'});
db.student_strength.belongsTo(db.cliftonstrength, {through: 'student_strength'});

db.student_badge.belongsTo(db.student, {through: 'student_badge'});
db.student_badge.belongsTo(db.badge, {through: 'student_badge'});

db.role_user.belongsTo(db.user, {through: 'role_user'});
db.role_user.belongsTo(db.role, {through: 'role_user'});

db.role_session.belongsTo(db.session, {through: 'role_session'});
db.role_session.belongsTo(db.role, {through: 'role_session'});

db.experience_events.belongsTo(db.event, {through: 'experience_events'});
db.experience_events.belongsTo(db.experience, {through: 'experience_events'});

db.experience_strength.belongsTo(db.cliftonstrength, {through: 'experience_strength'});
db.experience_strength.belongsTo(db.experience, {through: 'experience_strength'});

db.experience_major.belongsTo(db.major, {through: 'experience_major'});
db.experience_major.belongsTo(db.experience, {through: 'experience_major'});

db.task_strength.belongsTo(db.cliftonstrength, {through: 'task_strength'});
db.task_strength.belongsTo(db.task, {through: 'task_strength'});

db.flightplan_task.belongsTo(db.flightplan, { foreignKey: 'plan_id' });
db.flightplan_task.belongsTo(db.task, { foreignKey: 'task_id' });

db.task_major.belongsTo(db.major, {through: 'task_major'});
db.task_major.belongsTo(db.task, {through: 'task_major'});

db.flightplan_experience.belongsTo(db.flightplan, { foreignKey: 'plan_id' });
db.flightplan_experience.belongsTo(db.experience, { foreignKey: 'experience_id' });

db.task_preReq.belongsTo(db.task, { foreignKey: 'task_id' });
db.task_preReq.belongsTo(db.task, { foreignKey: 'preReq_id' });

db.student.belongsTo(db.major, { foreignKey: "major_id" });
db.major.hasMany(db.student, { foreignKey: "major_id" });

db.user.hasOne(db.student, { foreignKey: "user_id", onDelete: "CASCADE" });
db.student.belongsTo(db.user, { foreignKey: "user_id" });

db.student.belongsTo(db.major, { foreignKey: "major_id" });
db.major.hasMany(db.student, { foreignKey: "major_id" });

db.user.hasMany(db.flightplan_task, { foreignKey: "approved_by", onDelete: "SET NULL" });
db.flightplan_task.belongsTo(db.user, { foreignKey: "approved_by" });

db.user.hasMany(db.flightplan_experience, { foreignKey: "approved_by", onDelete: "SET NULL" });
db.flightplan_experience.belongsTo(db.user, { foreignKey: "approved_by" });

db.user.hasMany(db.flightplan_experience, { foreignKey: "approved_by", onDelete: "SET NULL" });
db.flightplan_experience.belongsTo(db.user, { foreignKey: "approved_by" });

db.event.hasMany(db.flightplan_experience, { foreignKey: "event_id", onDelete: "SET NULL" });
db.flightplan_experience.belongsTo(db.event, { foreignKey: "event_id" });

db.badge.hasMany(db.task, { foreignKey: "badge_id", onDelete: "SET NULL" });
db.task.belongsTo(db.badge, { foreignKey: "badge_id" });

db.student.hasMany(db.flightplan, { foreignKey: "student_id", onDelete: "CASCADE" });
db.flightplan.belongsTo(db.student, { foreignKey: "student_id" });



module.exports = db;