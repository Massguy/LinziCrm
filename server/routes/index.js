const express = require("express");
const authRoute = require("./auth.route");
const usersRoute = require("./users.router");
const pipelineRoute = require("./pipeline.route");
const noteRoute = require("./note.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/pipeline",
    route: pipelineRoute,
  },
  {
    path: "/notes",
    route: noteRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
