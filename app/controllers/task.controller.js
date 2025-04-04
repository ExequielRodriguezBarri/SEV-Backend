const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request

  if (!req.body.category) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Task
  const task = {
    category: req.body.category,
    type: req.body.type,
    reflection_required: req.body.reflection_required,
    scheduling_type: req.body.scheduling_type,
    name: req.body.name,
    description: req.body.description,
    rationale: req.body.rationale,
    points: req.body.points,
    required_task: req.body.required_task,
    semesters_from_graduation: req.body.semesters_from_graduation,
  };

  // Save Task in the database
  Task.create(task)
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

exports.updateTaskCompletion = async (req, res) => {
  try {
    const planId = req.body.plan_id;
    const taskId = req.body.task_id;
    const studentId = req.body.student_id;
    const pointsAwarded = req.body.points_awarded;

    // Validate required fields
    if (!planId || !taskId || !studentId) {
      return res.status(400).send({
        message: "plan_id, task_id, and student_id are all required!",
      });
    }

    // Get the models
    const FlightPlanTask = db.flightplan_task;
    const Student = db.student;

    // Update the flightplan_task record
    const [updatedRows] = await FlightPlanTask.update(
      {
        completion_date: req.body.completion_date || new Date(),
        points_awarded: pointsAwarded,
      },
      {
        where: {
          plan_id: planId,
          task_id: taskId,
        },
      }
    );

    if (updatedRows !== 1) {
      return res.status(404).send({
        message: `Cannot update task completion with plan_id=${planId} and task_id=${taskId}. Maybe the relation was not found!`,
      });
    }

    // Get the current student record
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).send({
        message: `Student with id=${studentId} not found.`,
      });
    }

    // Calculate the new points total
    const currentPoints = student.points_awarded || 0;
    const newPointsTotal = currentPoints + pointsAwarded;

    // Update the student record with the new points total
    await Student.update(
      { points_awarded: newPointsTotal },
      { where: { id: studentId } }
    );

    res.send({
      message:
        "Task completion was updated successfully and student points were updated.",
      newPointsTotal: newPointsTotal,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error updating task completion: ${err.message}`,
    });
  }
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category
    ? { category: { [Op.like]: `%${category}%` } }
    : null;

  Task.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Tasks.",
      });
    });
};
