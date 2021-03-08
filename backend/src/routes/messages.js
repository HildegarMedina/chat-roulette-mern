//Modules
const express = require("express");
const router = express();

//Schema
const Messages = require("../models/Messages");
const Chats = require("../models/Chats");

//View messages by chat
router.get("/api/messages/:id", async (req, res) => {

    //Get params
    const {id} = req.params;

    //Search chat
    await Chats.find({_id: id})
    .then(async response => {
        if (response.length != 0) {
            //Search messages
            const messages = await Messages.find({chat: id});
        
            //Result
            res.json(messages);
        }else {
            res.json({status: "Chat not found"});
        }
    })
    .catch(err => console.log(err));

});

//Send message
router.post("/api/messages/", async (req, res) => {
   
    //Get data
    const {from, to, message, chat} = req.body;

    //Send message
    const messages = new Messages({from, to, message, chat});

    //Result
    await messages.save();

    //Update chat
    const newchat = await Chats.findById(chat);

    //Change data
    newchat.messages.push(messages);

    //Save
    await newchat.save();
    
    res.json({status: "Message send"});

});

//Export 
module.exports = router;