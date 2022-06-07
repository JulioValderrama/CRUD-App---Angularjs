const express = require("express");
const route = express.Router();
const services = require("../services/render");

const controller = require("../controller/controller");

// RENDER ejs FILES

/**
 * @description Root Route to RENDER index.ejs
 * @method GET /
 */
route.get("/", services.homeRoutes)


/**
 * @description Add User to RENDER add_user.ejs
 * @method GET /add-user
 */
route.get("/add-user", services.add_user)



/**
 * @description Update User to RENDER update_user.ejs
 * @method GET /update-user
 */
route.get("/update-user", services.update_user);



// API

route.post("/api/users", controller.create)
route.get("/api/users", controller.find)
route.post("/api/users/:id", controller.update)
route.delete("/api/users/:id", controller.delete)



module.exports = route;