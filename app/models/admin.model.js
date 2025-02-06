module.exports = (sequlize, Sequelize) => {
const Admin = Sequelize.define("admin", {
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