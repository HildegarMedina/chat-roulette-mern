//Modules
const express = require("express");
const mongoose = require("mongoose");
const router = express();

//Schemas
const Users = require("../models/Users");

//View users
router.get("/api/user/", async (req, res) => {

    //Search users
    const users = await Users.find({});

    //Send users
    res.json(users);

});

//View user by id
router.get("/api/user/:id", async (req, res) => {

    //Get params
    const {id} = req.params;

    if(mongoose.Types.ObjectId.isValid(id)) {
        //Search user
        const user = await Users.findById(id);
        
        //Response
        res.json(user);

    }else {
        res.json({status: "Error id"})
    }


});

//View user by nick
router.get("/api/user/nick/:nick", async (req, res) => {

    //Get params
    const {nick} = req.params;

    //Search user
    const user = await Users.findOne({nick: nick});
    
    //Response
    res.json(user);

});

//Insert user
router.post("/api/user/", async (req, res) => {

    //Get data
    const {nick, age} = req.body;

    //New user
    const user = new Users({nick, age});

    //Save user
    await user.save()
        .then(usr => res.json(usr))
        .catch(err => res.json({status: err}));

});

//Delete user
router.delete("/api/user/:id", async (req, res) => {

    //Get params
    const {id} = req.params;

    if(mongoose.Types.ObjectId.isValid(id)) {

        //Delete user
        await Users.findByIdAndDelete(id)
    
        //Response
        .then(data => res.json({status: "User deleted"}))
        .catch(err => console.log(err));

    }else {
        res.json({status: "Error id"})
    }
    

});

//Export
module.exports = router;