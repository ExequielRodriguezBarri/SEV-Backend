const db = require("../models");
const Flightplan = db.flightplan;
const Op = db.Sequelize.Op;


// Create and Save a new Award
exports.create = (req, res) => {
    // Validate request
    if (!req.body.semester) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    // Create a Flightplan
    const flightplan = {
        semester: req.body.semester,
        semesters_from_graduation: req.body.semesters_from_graduation
        

    };

    // Save Flightplan in the database

    Flightplan.create(flightplan)
        .then(data => {
            res.send(data);
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Flightplan."
            });

        });
};


// Retrieve all Awards from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = semester ? { semester: { [Op.like]: `%${semester}%` } } : null;

    Flightplan.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Flightplans."
            });

        });
};

// Find a single Award with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Flightplan.findByPk(id)
        .then(data => {
            res.send(data);
        })

        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Flightplan with id=" + id
            });
        });

};

// Update a Award by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Flightplan.update(req.body, {
        where: { id: id }
    })

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Flightplan was updated successfully."
                });
            } else {

                res.send({
                    message: `Cannot update Flightplan with id=${id}. Maybe Flightplan was not found or req.body is empty!`
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Flightplan with id=" + id
            });
        });

};

// Delete a Award with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Flightplan.destroy({
        where: { id: id }
    })

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Flightplan was deleted successfully!"
                });
            } else {

                res.send({
                    message: `Cannot delete Flightplan with id=${id}. Maybe Flightplan was not found!`
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Flightplan with id=" + id
            });
        });

};

// Delete all Flightplans from the database.
exports.deleteAll = (req, res) => {
    Flightplan.destroy({
        where: {},
        truncate: false

    })
        .then(nums => {
            res.send({ message: `${nums} Flightplans were deleted successfully!` });
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Flightplans."
            });

        });
};
