const axios = require("axios");


/**
 * @description Root Route to RENDER index.ejs
 * @method GET /
 */

exports.homeRoutes = (req, res) => {

    // Make a get REQUEST to api/users
    axios.get("http://localhost:5500/api/users")
     .then(response => {
         res.locals.caca = response.data; // It is the same than adding response.data to any other variable and send it next with the res.render()
         res.render("index", {users: response.data})
     })
     .catch(err => {
         res.send(err)
     })
}


/**
 * @description Add User to RENDER add_user.ejs
 * @method GET /add-user
 */

exports.add_user = (req, res) => {
    res.render("add_user")
}


/**
 * @description Update User to RENDER update_user.ejs
 * @method POST "/api/users/:id"
 */

// When getting the REQUEST from the <a> edit BUTTON in _show.ejs we SEND a GET Request to the database with the ID and RENDER the update_user file passing the data and query to our view engine.
exports.update_user = (req, res) => {
    axios.get("http://localhost:5500/api/users", { params: {id:req.query.id}})
    .then(userdata => {
        // YOU CAN ACCESS TO THE REQ.QUERY FROM THE URL IN YOUR .EJS FILE LIKE THIS
        res.render("update_user", {user: userdata.data, query: req.query})
    })
    .catch(err => {
        res.send(err)
    })
}



