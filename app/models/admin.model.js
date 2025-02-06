module.exports = (sequlize, Sequelize) => {
const Admin = Sequelize.define("admin", {
    admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
return Admin;
}