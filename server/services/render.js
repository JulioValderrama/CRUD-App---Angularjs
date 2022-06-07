const axios = require("axios");


/**
 * @description Root Route to RENDER index.ejs
 * @method GET /
 */

exports.homeRoutes = (req, res) => {

    // Make a get REQUEST to api/users
    axios.get("http://localhost:5500/api/users")
     .then(response => {
         res.locals.users = response.data;
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

exports.update_user = (req, res) => {
    axios.get("http://localhost:5500/api/users", { params: {id:req.query.id}})
    .then(userdata => {
        //res.render("update_user", {users: response.data, query: req.query}) YOU CAN ACCESS TO THE REQ.QUERY FROM THE URL IN YOUR .EJS FILE LIKE THIS
        res.render("update_user", {user: userdata.data, query: req.query})
    })
    .catch(err => {
        res.send(err)
    })
}



