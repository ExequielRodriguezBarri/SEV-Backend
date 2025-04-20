module.exports = (app) => {
    const admin = require("../controllers/admin.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new User
    router.get("/pendingPlans", [authenticate], admin.getPendingFlightplans);
    router.post("/approveTask", [authenticate], admin.approveTask);
    router.post("/approveExperience", [authenticate], admin.approveExperience);

  
    app.use("/flight-plan-t7/admin", router);
  };