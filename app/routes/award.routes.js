module.exports = (app) => {
    const award = require("../controllers/award.controller.js");
    var router = require("express").Router();
  
    // Create a new Award
    router.post("/", award.create);
  
    // Retrieve all Awards
    router.get("/", award.findAll);
  
    // Retrieve a single Award with id
    router.get("/:id", award.findOne);
  
    // Update a Award with id
    router.put("/:id", award.update);
  
    // Delete a Award with id
    router.delete("/:id", award.delete);
  
    // Delete all Awards
    router.delete("/", award.deleteAll);
  
    app.use("/flight-plan-t7/awards", router);
  };
  