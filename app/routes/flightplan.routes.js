module.exports = (app) => {
    const flightplan = require("../controllers/flightplan.controller.js");
    var router = require("express").Router();
    const multer = require("multer");
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    });
  

    // Create a new Flightplan
    router.post("/", flightplan.create);
  

    // Retrieve all Flightplans
    router.get("/student/:id", flightplan.findAll);
  

    // Retrieve a single Flightplan with id
    router.get("/:id", flightplan.findOne);
  

    // Update a Flightplan with id
    router.put("/:id", flightplan.update);
  

    // Delete a Flightplan with id
    router.delete("/:id", flightplan.delete);
  

    // Delete all Flightplans
    router.delete("/", flightplan.deleteAll);

    // Update task completion date in the bridge table (flightplan_task)
    router.put("/:flightplanId/tasks/:taskId", flightplan.updateTaskCompletionDate);

    // Update experience completion date in the bridge table (flightplan_experience)
    router.put("/:flightplanId/experiences/:experienceId", flightplan.updateExperienceCompletionDate);

    router.put("/:flightplanId/tasks/:taskId/reflection", flightplan.uploadTaskReflection);

    router.post("/:flightplanId/tasks/:taskId/file", upload.single("file"), flightplan.uploadTaskFile);

    router.get("/:flightplanId/tasks/:taskId/file", flightplan.getTaskFile);

    router.get('/:flightplanId/tasks/:taskId/info', flightplan.getTaskInfo);

    app.use("/flight-plan-t7/flightplans", router);
  };
  