module.exports = app => {
    const cliftonstrength = require("../controllers/cliftonstrength.controller.js");

    var router = require("express").Router();

    // Create a new Cliftonstrength
    router.post("/", cliftonstrength.create);

    // Retrieve all Cliftonstrengths
    router.get("/", cliftonstrength.findAll);

    // Retrieve a single Cliftonstrength with id
    router.get("/:id", cliftonstrength.findOne);

    // Update a Cliftonstrength with id
    router.put("/:id", cliftonstrength.update);

    // Delete a Cliftonstrength with id
    router.delete("/:id", cliftonstrength.delete);

    // Delete all Cliftonstrengths
    router.delete("/", cliftonstrength.deleteAll);

    app.use('/eagleflight/cliftonstrengths', router);
};
