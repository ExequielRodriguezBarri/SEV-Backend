module.exports = (app) => {
    const flightplan = require("../controllers/flightplan.controller.js");
    var router = require("express").Router();
  

    // Create a new Flightplan
    router.post("/", flightplan.create);
  

    // Retrieve all Flightplans
    router.get("/", flightplan.findAll);
  

    // Retrieve a single Flightplan with id
    router.get("/:id", flightplan.findOne);
  

    // Update a Flightplan with id
    router.put("/:id", flightplan.update);
  

    // Delete a Flightplan with id
    router.delete("/:id", flightplan.delete);
  

    // Delete all Flightplans
    router.delete("/", flightplan.deleteAll);
  

    app.use("/flight-plan-t7/flightplans", router);
  };
  