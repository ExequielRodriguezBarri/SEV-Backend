module.exports = (app) => {
    const major = require("../controllers/major.controller.js");
    var router = require("express").Router();
  

    // Create a new Major
    router.post("/", major.create);
  

    // Retrieve all Majors
    router.get("/", major.findAll);
  

    // Retrieve a single Major with id
    router.get("/:id", major.findOne);
  

    // Update a Major with id
    router.put("/:id", major.update);
  

    // Delete a Major with id
    router.delete("/:id", major.delete);
  

    // Delete all Majors
    router.delete("/", major.deleteAll);
  
    app.use("/flight-plan-t7/majors", router);
  };
  