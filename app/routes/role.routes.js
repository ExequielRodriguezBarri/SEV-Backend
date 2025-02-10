module.exports = app => {
    const roles = require("../controllers/role.controller.js");


    var router = require("express").Router();

    // Create a new Role
    router.post("/", roles.create);


    // Retrieve all Roles
    router.get("/", roles.findAll);


    // Retrieve a single Role with id
    router.get("/:id", roles.findOne);


    // Update an Role with id
    router.put("/:id", roles.update);


    // Delete an Role with id
    router.delete("/:id", roles.delete);


    // Delete all Roles
    router.delete("/", roles.deleteAll);


    // Use the same base URL structure as events
    app.use("/eagleflight/roles", router);

};