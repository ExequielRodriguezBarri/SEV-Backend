const db = require("../models");
const FlightplanTask = db.flightplan_task;
const FlightplanExperience = db.flightplan_experience;
const Student = db.student;
const Op = db.Sequelize.Op;

// Retrieve all People from the database.
exports.getPendingFlightplans = async (req, res) => {
  const condition = {
    completion_date: { [Op.not]: null },
    approved_by: { [Op.is]: null },
  };

  try {
    const pendingTasks = await FlightplanTask.findAll({
      where: condition,
      include: [
        {
          model: db.task,
          attributes: ["name", "points"], // Task details
        },
        {
          model: db.flightplan,
          include: [
            {
              model: db.student,
              attributes: ["fName", "lName", "id"], // Student info
            },
          ],
        },
      ],
    });

    const pendingExperiences = await FlightplanExperience.findAll({
      where: condition,
      include: [
        {
          model: db.experience,
          attributes: ["name", "points"], // Experience details
        },
        {
          model: db.flightplan,
          include: [
            {
              model: db.student,
              attributes: ["fName", "lName", "id"], // Student info
            },
          ],
        },
      ],
    });

    res.send({
      tasks: pendingTasks,
      experiences: pendingExperiences,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.approveTask = async (req, res) => {
  const { task_id, plan_id, user_id, points, student_id } = req.body;

  if (!task_id || !plan_id || !user_id) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const record = await db.flightplan_task.findOne({
      where: { task_id, plan_id },
    });

    if (!record) {
      return res
        .status(404)
        .send({ message: "Task not found for given plan." });
    }

    record.approved_by = user_id;
    await record.save();
    // Get the current student record
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).send({
        message: `Student with id=${student_id} not found.`,
      });
    }

    // Calculate the new points total
    const currentPoints = student.points_awarded || 0;
    const newPointsTotal = currentPoints + points;

    // Update the student record with the new points total
    await Student.update(
      { points_awarded: newPointsTotal },
      { where: { id: student_id } }
    );

    return res.status(200).send({ message: "Task approved successfully." });
  } catch (error) {
    console.error("Approval error:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

exports.approveExperience = async (req, res) => {
  const { experience_id, plan_id, user_id, points, student_id } = req.body;

  if (!experience_id || !plan_id || !user_id) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const record = await db.flightplan_experience.findOne({
      where: { experience_id, plan_id },
    });

    if (!record) {
      return res
        .status(404)
        .send({ message: "experience not found for given plan." });
    }

    record.approved_by = user_id;
    await record.save();
    // Get the current student record
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).send({
        message: `Student with id=${student_id} not found.`,
      });
    }

    // Calculate the new points total
    const currentPoints = student.points_awarded || 0;
    const newPointsTotal = currentPoints + points;

    // Update the student record with the new points total
    await Student.update(
      { points_awarded: newPointsTotal },
      { where: { id: student_id } }
    );

    return res.status(200).send({ message: "experience approved successfully." });
  } catch (error) {
    console.error("Approval error:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};
