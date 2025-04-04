const db = require("../models");
const Experience = db.experience;
const Op = db.Sequelize.Op;

// Create and Save a new Experience
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.category ||
    !req.body.required_experience ||
    !req.body.semesters_from_graduation
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create an Experience
  const experience = {
    category: req.body.category,
    type: req.body.type,
    reflection_required: req.body.reflection_required,
    scheduling_type: req.body.scheduling_type,
    name: req.body.name,
    description: req.body.description,
    rationale: req.body.rationale,
    points: req.body.points,
    required_experience: req.body.required_experience,
    semesters_from_graduation: req.body.semesters_from_graduation,
  };

  // Save Experience in the database
  Experience.create(experience)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Experience.",
      });
    });
};

exports.updateCompletion = async (req, res) => {
  try {
    const planId = req.body.plan_id;
    const experienceId = req.body.experience_id;
    const studentId = req.body.student_id;
    const pointsAwarded = req.body.points_awarded;

    // Validate required fields
    if (!planId || !experienceId || !studentId) {
      return res.status(400).send({
        message: "plan_id, task_id, and student_id are all required!",
      });
    }

    // Get the models
    const FlightPlanExperience = db.flightplan_experience;
    const Student = db.student;

    // Update the flightplan_task record
    const [updatedRows] = await FlightPlanExperience.update(
      {
        completion_date: req.body.completion_date || new Date(),
        points_awarded: pointsAwarded,
      },
      {
        where: {
          plan_id: planId,
          experience_id: experienceId,
        },
      }
    );

    if (updatedRows !== 1) {
      return res.status(404).send({
        message: `Cannot update experience completion with plan_id=${planId} and experience_id=${experienceId}. Maybe the relation was not found!`,
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
        "Experience completion was updated successfully and student points were updated.",
      newPointsTotal: newPointsTotal,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error updating task completion: ${err.message}`,
    });
  }
};

// Retrieve all Experiences from the database.
exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category
    ? { category: { [Op.like]: `%${category}%` } }
    : null;

  Experience.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Experiences.",
      });
    });
};

// Find a single Experience with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Experience.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Experience with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Experience with id=" + id,
      });
    });
};

// Update a Experience by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Experience.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Experience was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Experience with id=${id}. Maybe Experience was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Experience with id=" + id,
      });
    });
};

// Delete a Experience with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Experience.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Experience was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Experience with id=${id}. Maybe Experience was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Experience with id=" + id,
      });
    });
};

// Delete all Experiences from the database.
exports.deleteAll = (req, res) => {
  Experience.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Experiences were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Experiences.",
      });
    });
};
