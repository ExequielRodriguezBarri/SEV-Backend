const db = require("../models");
const Flightplan = db.flightplan;
const Op = db.Sequelize.Op;

// Create and Save a new Award
exports.create = (req, res) => {
  // Validate request
  if (!req.body.semester) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Flightplan
  const flightplan = {
    semester: req.body.semester,
    semesters_from_graduation: req.body.semesters_from_graduation,
  };

  // Save Flightplan in the database

  Flightplan.create(flightplan)
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flightplan.",
      });
    });
};

// Retrieve all Awards from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const student_id = req.params.id;
  var condition = {};

  if (req.query.semester) {
    condition.semester = { [Op.like]: `%${req.query.semester}%` };
  }

  if (student_id) {
    condition.student_id = student_id;
  }
  
  Flightplan.findAll({
    where: condition,
    include: [
      {
        model: db.experience,
        through: { attributes: ["completion_date"] }, // Exclude bridge table attributes
      },
      {
        model: db.task,
        through: { attributes: ["completion_date"] }, // Exclude bridge table attributes
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Flightplans.",
      });
    });
};

// Find a single Award with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flightplan.findByPk(id)
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Flightplan with id=" + id,
      });
    });
};

// Update a Flight Plan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Flightplan.update(req.body, {
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flightplan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Flightplan with id=${id}. Maybe Flightplan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Flightplan with id=" + id,
      });
    });
};

// Delete a Flight Plan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Flightplan.destroy({
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flightplan was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Flightplan with id=${id}. Maybe Flightplan was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Flightplan with id=" + id,
      });
    });
};

// Delete all Flightplans from the database.
exports.deleteAll = (req, res) => {
  Flightplan.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Flightplans were deleted successfully!` });
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Flightplans.",
      });
    });
};

exports.updateTaskCompletionDate = async (req, res) => {
  const { flightplanId, taskId } = req.params;
  const { completion_date } = req.body;

  console.log("Received parameters:", { flightplanId, taskId, completion_date });

  try {
    const result = await db.flightplan_task.update(
      { completion_date: completion_date || new Date() }, // Default to current date if no date provided
      {
        where: {
          plan_id: flightplanId,
          task_id: taskId,      
        },
      }
    );

    console.log("Update result:", result);

    // Check if the update was successful
    if (result[0] === 1) {
      res.send({ message: "Task completion date updated successfully." });
    } else {
      res.status(404).send({
        message: `No matching record found for plan_id=${flightplanId} and task_id=${taskId}.`,
      });
    }
  } catch (err) {
    console.error("Error updating task completion date:", err);
    res.status(500).send({
      message: "An error occurred while updating the task completion date.",
    });
  }
};

exports.updateExperienceCompletionDate = async (req, res) => {
  const { flightplanId, experienceId } = req.params;
  const { completion_date } = req.body;

  console.log("Received parameters:", { flightplanId, experienceId, completion_date });

  try {
    const result = await db.flightplan_experience.update(
      { completion_date: completion_date || new Date() }, // Default to current date if no date provided
      {
        where: {
          plan_id: flightplanId,
          experience_id: experienceId,
        },
      }
    );

    console.log("Update result:", result);

    // Check if the update was successful
    if (result[0] === 1) {
      res.send({ message: "Experience completion date updated successfully." });
    } else {
      res.status(404).send({
        message: `No matching record found for plan_id=${flightplanId} and experience_id=${experienceId}.`,
      });
    }
  } catch (err) {
    console.error("Error updating experience completion date:", err);
    res.status(500).send({
      message: "An error occurred while updating the experience completion date.",
    });
  }
};