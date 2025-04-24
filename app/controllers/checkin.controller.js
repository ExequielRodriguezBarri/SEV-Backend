const db = require("../models");
const { user, student, flightplan, experience_event } = db;
const flightplanController = require("./flightplan.controller");

exports.submitCheckin = async (req, res) => {
  const { firstName, lastName, email, eventId } = req.body;

  try {
    // 1. Find the user
    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(404).send({ message: "User not found." });
    }

    // 2. Find the student linked to that user
    const foundStudent = await student.findOne({ where: { user_id: foundUser.id } });
    if (!foundStudent) {
      return res.status(404).send({ message: "Student not found for this user." });
    }

    // 3. Get the flightplan
    const plan = await flightplan.findOne({
      where: { student_id: foundStudent.id }
    });

    if (!plan) {
      return res.status(404).send({ message: "Flightplan not found." });
    }

    // 4. Get all experiences linked to the event
    const links = await experience_event.findAll({ where: { event_id: eventId } });

    if (links.length === 0) {
      return res.status(404).send({ message: "No experience(s) linked to this event." });
    }

    // 5. Use your flightplan controller method to update each experience
    for (const { experience_id } of links) {
      // simulate req/res for controller method
      const fakeReq = {
        params: {
          flightplanId: plan.id,
          experienceId: experience_id
        },
        body: {
          completion_date: new Date(),
          awarded_points: 0,
          studentId: foundStudent.id
        }
      };

      const fakeRes = {
        send: (data) => console.log("✓ Experience updated:", data),
        status: (code) => ({
          send: (data) => console.warn("✗ Experience update error:", code, data)
        })
      };

      await flightplanController.updateExperienceCompletionDate(fakeReq, fakeRes);
    }

    res.status(200).send({ message: "Experience(s) marked as completed." });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Check-in failed." });
  }
};
