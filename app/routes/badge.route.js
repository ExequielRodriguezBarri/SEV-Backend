module.exports = (app) => {
    const badge = require("../controllers/badge.controller.js");
    var router = require("express").Router();
  

    // Create a new Badge
    router.post("/", badge.create);
  

    // Retrieve all Badges
    router.get("/", badge.findAll);
  

    // Retrieve a single Badge with id
    router.get("/:id", badge.findOne);
  

    // Update a Badge with id
    router.put("/:id", badge.update);
  

    // Delete a Badge with id
    router.delete("/:id", badge.delete);
  

    // Delete all Badges
    router.delete("/", badge.deleteAll);
  

    app.use("/flight-plan-t7/badges", router);

  };
          