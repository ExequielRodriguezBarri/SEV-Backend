module.exports = (app) => {
    const checkin = require("../controllers/checkin.controller.js");
  
    const router = require("express").Router();
  
    // Check-in submission
    router.post("/", checkin.submitCheckin);
  
    app.use("/flight-plan-t7/checkin", router);
  };
  