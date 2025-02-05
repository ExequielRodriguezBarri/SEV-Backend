module.exports = (app) => {
  const experience = require("../controllers/experience.controller.js");

  var router = require("express").Router();

  // Create a new Experience
  router.post("/", experience.create);

  // Retrieve all Experiences
  router.get("/", experience.findAll);

  // Retrieve a single Experience with id
  router.get("/:id", experience.findOne);

  // Update a Experience with id
  router.put("/:id", experience.update);

  // Delete a Experience with id
  router.delete("/:id", experience.delete);

  // Delete all Experiences
  router.delete("/", experience.deleteAll);

  app.use("/eagleflight/experiences", router);
};
