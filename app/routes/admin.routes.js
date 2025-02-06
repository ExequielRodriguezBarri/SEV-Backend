module.exports = app => {
    const admins = require("../controllers/admin.controller.js");

    var router = require("express").Router();

    // Create a new Admin
    router.post("/", admins.create);

    // Retrieve all Admins
    router.get("/", admins.findAll);

    // Retrieve a single Admin with id
    router.get("/:id", admins.findOne);

    // Update an Admin with id
    router.put("/:id", admins.update);

    // Delete an Admin with id
    router.delete("/:id", admins.delete);

    // Delete all Admins
    router.delete("/", admins.deleteAll);

    // Use the same base URL structure as events
    app.use("/eagleflight/admins", router);
};