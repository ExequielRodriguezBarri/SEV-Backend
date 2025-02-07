const db = require("../models");
const Cliftonstrength = db.cliftonstrength;

// Create and Save a new Cliftonstrength
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Cliftonstrength
    const cliftonstrength = {
        name: req.body.name,
        description: req.body.description
    };

    // Save Cliftonstrength in the database
    Cliftonstrength.create(cliftonstrength)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Cliftonstrength."
            });
        });
};

// Retrieve all Cliftonstrengths from the database.
exports.findAll = (req, res) => {
    Cliftonstrength.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cliftonstrengths."
            });
        });
};

// Find a single Cliftonstrength with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliftonstrength.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Cliftonstrength with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Cliftonstrength with id=" + id
            });
        });
};

// Update a Cliftonstrength by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Cliftonstrength.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliftonstrength was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cliftonstrength with id=${id}. Maybe Cliftonstrength was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Cliftonstrength with id=" + id
            });
        });
};

// Delete a Cliftonstrength with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cliftonstrength.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliftonstrength was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cliftonstrength with id=${id}. Maybe Cliftonstrength was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Cliftonstrength with id=" + id
            });
        });
};

// Delete all Cliftonstrengths from the database.
exports.deleteAll = (req, res) => {
    Cliftonstrength.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Cliftonstrengths were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all cliftonstrengths."
            });
        });
};
