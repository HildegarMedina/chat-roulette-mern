import axios from "axios";
import nProgress from "nprogress";
import { createContext, useContext, useEffect, useState } from "react";
import { Events, scroller } from "react-scroll";
import { UserContexts } from '../contexts/UserContexts';

//Interface
type typeChat = {
    id: string,
    user: {
        id: string,
        nick: string,
        age: number
    },
    messages: any
};
interface ChatContextsData {
    chat: typeChat,
    setChat: (typeChat) => void,
    requestChat: number,
    startRequestChat: () => void,
    cancelRequestChat: () => void,
    currentTime: number,
    formChat: string,
    setFormChat: (any) => void,
    sendMessage: () => void,
    scrollToWithContainer: () => void,
    skipChat: () => void,
    exitChat: () => void
}

//Chat context
export const ChatContexts = createContext({} as ChatContextsData);

//Chat context provider
export function ChatContextsProvider({children}) {

    //States
    const [chat, setChat] = useState(null);
    const [requestChat, setRequestChat] = useState(0); // 0 = inactive | 1 = waiting | 2 = active
    const {user} = useContext(UserContexts);
    const [currentTime, setCurrentTime] = useState(1);
    const [currentTimeChat, setCurrentTimeChat] = useState(0);
    const [formChat, setFormChat] = useState("");
    const [cancel, setCancel] = useState(false);
    const [lastMessage, setLastMessage] = useState({
        last: ""
    });
    var time  = null;
    var timeChat = null;

    //Verify chat roulette
    useEffect(()=> {
        if (requestChat == 1) {
            time = setTimeout(async ()=> {
                await axios.get(`http://192.168.1.54:8081/api/chats/verify/${user.nick}`)
                .then(async response => {
                    var data = response.data;
                    if (data) {
                        var to = "";
                        if (data.user1 != user.nick) {
                            to = data.user1;
                        }else {
                            to = data.user2;
                        }
                        await axios.get(`http://192.168.1.54:8081/api/user/nick/${to}`)
                        .then(user => {
                            const newChat = {
                                id: data._id,
                                user: {
                                    id: user.data._id,
                                    nick: user.data.nick,
                                    age: user.data.age
                                },
                                messages: data.messages
                            };
                            setChat(newChat)
                            setRequestChat(2);
                            setCurrentTime(0);
                            M.toast({html: `<b>New chat with ${user.data.nick}</b>`, classes: "teal lighten-1"});
                        })
                    }
                    setCurrentTime(currentTime + 1);
                })
                .catch(err => {
                    console.log(err);
                })

            }, 1000);
        }
    }, [requestChat, currentTime])

    //Verify new messages
    useEffect(()=> {

        if (requestChat == 2) {

            timeChat = setTimeout(async ()=> {

                if (cancel) {
                    await axios.post("http://192.168.1.54:8081/api/chats/cancel/", {id: user.id})
                    .then(async response => {
                            setRequestChat(0);
                            setCurrentTime(0);
                            await axios.delete(`http://192.168.1.54:8081/api/chats/${chat.id}`)
                            .then(resp => {
                                setChat(null);
                                nProgress.done();
                            })
                            .catch(err => nProgress.done());
                        })
                }else {

                    await axios.get(`http://192.168.1.54:8081/api/messages/${chat.id}`)
                    .then(async response => {
                        if (response.data.status == "Chat not found") {
                            await axios.post("http://192.168.1.54:8081/api/chats/wait/", {id: user.id})
                            .then(response => {
                                if (response.data.status == "Status in waiting") {
                                    setRequestChat(1);
                                    setChat(null);
                                }
                            })
                        }else {
                            var count = response.data.length;
                            if(count > 0) {
                                var fromChat = response.data[count - 1].from;
                                var lastMsg = fromChat + ":" + response.data[count - 1].message;
                                if (lastMsg != lastMessage.last && fromChat != user.nick && lastMessage.last != "") {
                                    setLastMessage({
                                        last: lastMsg
                                    });
                                    setChat({
                                        ...chat,
                                        messages: response.data
                                    });
                                    scrollToWithContainer();
                                    new Audio("/notification.mp3").play();
                                    if (Notification.permission === "granted") {
                                        new Notification("Chat roulette - New message", {
                                            body: `New message of ${chat.user.nick}`
                                        });
                                    }
                                    M.toast({html: `<b>New message</b>`, classes: "teal lighten-1"});
                                }else {
                                    setLastMessage({
                                        last: lastMsg
                                    });
                                    setChat({
                                        ...chat,
                                        messages: response.data
                                    });
                                }
                            }
                        }
                    })
                    .catch(err => console.log(err));
    
                    setCurrentTimeChat(currentTimeChat + 1);
                }

            }, 2000)

        }
        
    }, [currentTimeChat, requestChat])


    //Start request chat
    const startRequestChat = async () => {
        nProgress.start();
        await axios.post("http://192.168.1.54:8081/api/chats/wait/", {id: user.id})
        .then(response => {
            if (response.data.status == "Status in waiting") {
                setRequestChat(1);
            }
            nProgress.done();
        })
        .catch(err => {
            nProgress.done();
            M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
        })
    }

    //Skip chat
    const skipChat = async () => {
        nProgress.start();
        await axios.delete(`http://192.168.1.54:8081/api/chats/${chat.id}`)
        .then(async response => {
            if (response.data.status == "Chat deleted") {
                await axios.post("http://192.168.1.54:8081/api/chats/wait/", {id: user.id})
                .then(response => {
                    if (response.data.status == "Status in waiting") {
                        setRequestChat(1);
                        setChat(null);
                    }
                    nProgress.done();
                })
            }
            nProgress.done();
        })
        .catch(err => {
            nProgress.done();
            M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
        })
    }

    //Exit chat
    const exitChat = async () => {
        nProgress.start();
        setCancel(true);
    }

    //Cancel request chat
    const cancelRequestChat = async () => {
        nProgress.start();
        setCurrentTime(0);
        await axios.post("http://192.168.1.54:8081/api/chats/cancel/", {id: user.id})
        .then(response => {
            if (response.data.status == "Status canceled") {
                setRequestChat(0);
            }
            clearInterval(time);
            nProgress.done();
        })
        .catch(err => {
            nProgress.done();
            M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
        })
    }

    //Send message
    const sendMessage = async () => {
        nProgress.start();
        if (formChat == "") {
            M.toast({html: '<b>You must enter your message</b>', classes: "red lighten-1"});
            nProgress.done();
        }else {
            const message = {
                from: user.nick,
                to: chat.user.nick,
                message: formChat,
                chat: chat.id
            }
            await axios.post("http://192.168.1.54:8081/api/messages/", message)
            .then(response => {
                if (response.data.status == "Message send") {
                    setFormChat("");
                }
                nProgress.done();
            })
            .catch(err => {
                nProgress.done();
                M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
            })
        }
    }

    //Scroll down
    const scrollToWithContainer = () => {

        let goToContainer = new Promise((resolve, reject) => {
    
            Events.scrollEvent.register('end', () => {
                resolve("");
                Events.scrollEvent.remove('end');
            });
    
            scroller.scrollTo('scroll-container', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });
    
        });
    
        goToContainer.then(() =>
            scroller.scrollTo('scroll-container-second-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: 'scroll-container'
        }));
    }

    return (
        <ChatContexts.Provider value={{
            chat,
            setChat,
            requestChat,
            startRequestChat,
            cancelRequestChat,
            currentTime,
            formChat,
            setFormChat,
            sendMessage,
            scrollToWithContainer,
            skipChat,
            exitChat
        }}>
            {children}
        </ChatContexts.Provider>
    )

}