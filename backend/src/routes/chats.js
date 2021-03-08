//Modules
const express = require("express");
const router = express();

//Schema
const Users = require("../models/Users");
const Chat = require("../models/Chats");
const Messages = require("../models/Messages");

//Roulette
setInterval(async ()=> {

    //Find users active
    await Users.find({status: true})
    
    //Result
    .then(async users => {

        if (users.length > 1) {

            //Set users
            let user1 = "";
            let user2 = "";

            //While
            for (let i = 0; i <= users.length; i++) {

                if (user1 == "") {
                    user1 = users[i];
                }else if(user2 == "") {
                    user2 = users[i];
                }else if(user1.id != "" && user2.id != "") {

                    nick1 = user1.nick;
                    nick2 = user2.nick;

                    //Create chat
                    const chat = new Chat({user1: nick1, user2: nick2});

                    //save chat
                    const newChat = await chat.save();

                    if (newChat != false) {

                        //Change state
                        await Users.findByIdAndUpdate({_id: user1.id}, {$set: {status: false}}, {upsert: true});
                        await Users.findByIdAndUpdate({_id: user2.id}, {$set: {status: false}}, {upsert: true});
    
                        console.log(`New roulette: ${nick1} : ${nick2}`);

                        user1 = ""; user2 = "";

                    }


                }
                
            }
        }
    })
    
    //Error
    .catch(err => console.log(err));
}, 4000);

//Verify status chat
router.get("/api/chats/verify/:nick", async (req, res) => {

    //Get params
    const {nick} = req.params;

    //Search chat
    await Chat.findOne({ $or: [ {user1: nick}, {user2: nick} ]})

    //Result
    .then(result => res.json(result))
    .catch(err => console.log(err));
    

});

//Wait chat
router.post("/api/chats/wait/", async (req, res) => {

    //Get params
    const {id} = req.body;
    
    //Change state
    await Users.findByIdAndUpdate({_id:id}, {$set: {status: true}}, {upsert: true})

    //Result
    .then(result => res.json({status: "Status in waiting"}))
    .catch(err => console.log(err));

});

//Cancel find
router.post("/api/chats/cancel/", async (req, res) => {

    //Get params
    const {id} = req.body;
    
    //Change state
    await Users.findByIdAndUpdate({_id:id}, {$set: {status: false}}, {upsert: true})

    //Result
    .then(result => res.json({status: "Status canceled"}))
    .catch(err => console.log(err));

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
    .then(async chat => {
        if (chat != null) {
            //Delete messages
            chat.messages.map(async msg => {
                await Messages.findByIdAndDelete(msg._id);
            });

            res.json({status: "Chat deleted"})
        }else {
            res.json({status: "Chat not found"})
        }
    })
    .catch(err => console.log(err));

});
 
//Export
module.exports = router;