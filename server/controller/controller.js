var Userdb = require("../model/model");

// retrieve and return all users/ retrive and return a single user
// route.get("/api/users", controller.find)
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

}

// create and save new user
exports.create = (req, res) => {

    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content to create a Document can not be empty!"});
        return;
    }

    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
    .save(user)
    .then(data => {
        //res.send(data)
        res.redirect("/")
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        })
    })

}


// update a new identified user by user id
// route.post("/api/users/:id", controller.update)
exports.update = (req, res) => {

    if (!req.body) {
        return res
        .status(400)
        .send({ message: "Data to update can not be empty!"});
    }

    // We get this data when we click on the SAVE button on the update_user form with the method POST. The id was in URL from the edit button we click in _show.ejs
    const id = req.params.id;

    Userdb.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data) {
            res.status(404).send({ message:  `Cannot Update user with ${id}. Maybe user not found!`});
        }
        else {
            //res.send(data)
            console.log(data)
            console.log(`User ${req.body.name} UPDATED!!`)
            res.redirect("/");
        }
        })
        .catch(err => {
            res.status(500).send({ message : "Error Update user information"})
        })
}

// delete user with specified user id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

}