module.exports = (app) => {
  const student = require("../controllers/student.controller.js");

  var router = require("express").Router();

  // Create a new Student
  router.post("/", student.create);

  // Retrieve all Students
  router.get("/", student.findAll);

  // Retrieve a single Student with id
  router.get("/:id", student.findOne);

  // Update a Student with id
  router.put("/:id", student.update);

  // Delete a Student with id
  router.delete("/:id", student.delete);

  // Delete all Students
  router.delete("/", student.deleteAll);

  app.use("/flight-plan-t7/students", router);
};
