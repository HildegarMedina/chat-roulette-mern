//Modules
const express = require("express");
const router = express();

//Schema
const Chat = require("../models/Chats");

//Create chat
router.post("/api/chats/", async (req, res) => {
   
    //Get datas
    const {user1, user2} = req.body;

    //Search
    const result = await Chat.find({$or: [{user1: user1, user2: user2}]});
    
    //Chat find
    if(result.length > 0) {
        res.json({status: "Chat has already been created"});
    }else {
        
        //Create chat
        const chat = new Chat({user1, user2});

        //save chat
        await chat.save()

        //Result
        .then(chat => res.json({status: "Chat created"}))
        .catch(err => console.log(err));

    }

});

//View chat
router.get("/api/chats/:id", async (req, res) => {

    //Get params
    const {id} = req.params;

    //Search chat
    const chat = await Chat.findById(id).populate("messages");

    //Result
    res.json(chat);

});

//Delete chat
router.delete("/api/chats/:id", async (req, res) => {

    //Get params
    const {id} = req.params;

    //Delete chat with messages
    const chat = await Chat.findById(id);

    //Delete chat
    await Chat.findByIdAndDelete(id)
    
    //Result
    .then(chat => res.json({status: "Chat deleted"}))
    .catch(err => console.log(err));

    //Delete messages
    //Comming soon

});
 
//Export
module.exports = router;