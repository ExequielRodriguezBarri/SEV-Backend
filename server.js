require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync({ force: false });

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json({ limit: '10mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/flightplan.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/award.routes.js")(app);
require("./app/routes/major.routes.js")(app);
require("./app/routes/experience.routes.js")(app);
require("./app/routes/event.routes.js")(app);
require("./app/routes/student.routes.js")(app);
require("./app/routes/flightplan.routes.js")(app);



// set port, listen for requests
const PORT = process.env.PORT || 3037;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;