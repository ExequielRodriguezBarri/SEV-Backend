const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = async (req, res) => {
  const { name, description, event_type, date, start_time, end_time, location, attendance_type, registration, completion_type, experienceIds } = req.body;

  // Define the event data
  const event = {
    name,
    description,
    event_type,
    date,
    start_time,
    end_time,
    location,
    attendance_type,
    registration,
    completion_type,
  };

  try {
    // Create the event in the database
    const createdEvent = await Event.create(event);

    // If experienceIds are provided, link them to the created event
    if (experienceIds && experienceIds.length > 0) {
      await createdEvent.addExperiences(experienceIds); 
    }

    // Return the created event as a response
    res.status(201).send(createdEvent);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Event.",
    });
  }
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { name: { [Op.like]: `%${title}%` } } : null;
  Event.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Find a single Event with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findByPk(id, {
      include: {
        model: db.experience,
        through: { attributes: [] }, // Exclude the bridge table attributes
      },
    });

    if (!event) {
      return res.status(404).send({ message: `Cannot find Event with id=${id}.` });
    }

    res.send(event);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving Event with id=${id}`,
    });
  }
};


// Update a Event by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // 1. Update event fields
    const [updatedRows] = await Event.update(req.body, {
      where: { id }
    });

    if (updatedRows !== 1) {
      return res.status(404).send({
        message: `Cannot update Event with id=${id}. Maybe it was not found.`
      });
    }

    // 2. Update event-experience relations if provided
    if (req.body.experienceIds && Array.isArray(req.body.experienceIds)) {
      const event = await Event.findByPk(id);
      await event.setExperiences(req.body.experienceIds); // ✅ many-to-many update
    }

    res.send({ message: "Event updated successfully." });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).send({
      message: err.message || "Error updating Event with id=" + id
    });
  }
};


// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Event with id=" + id,
      });
    });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events.",
      });
    });
};

// Get all experiences linked to a specific event
exports.getEventExperiences = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await db.event.findByPk(eventId, {
      include: {
        model: db.experience,
        through: { attributes: [] },
        attributes: ['id', 'name'] // Only send minimal info
      }
    });

    if (!event) {
      return res.status(404).send({ message: `Event with id=${eventId} not found.` });
    }

    res.send(event.experiences);
  } catch (error) {
    res.status(500).send({ message: `Error retrieving experiences: ${error.message}` });
  }
};
