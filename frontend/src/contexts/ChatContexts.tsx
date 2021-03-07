import axios from "axios";
import { userInfo } from "node:os";
import nProgress from "nprogress";
import { createContext, useContext, useEffect, useState } from "react";
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
    currentTime: number
}

//Chat context
export const ChatContexts = createContext({} as ChatContextsData);

//Chat context provider
export function ChatContextsProvider({children}) {

    //States
    const [chat, setChat] = useState(null);
    const [requestChat, setRequestChat] = useState(0); // 0 = inactive | 1 = waiting | 2 = active
    const { user } = useContext(UserContexts);
    const [currentTime, setCurrentTime] = useState(1);
    var time  = null;

    useEffect(()=> {
        if (requestChat == 1) {
            time = setTimeout(async ()=> {
                setCurrentTime(currentTime + 1);
                await axios.get(`http://localhost:8081/api/chats/verify/${user.nick}`)
                .then(async response => {
                    var data = response.data;
                    if (data) {
                        var to = "";
                        if (data.user1 != user.nick) {
                            to = data.user1;
                        }else {
                            to = data.user2;
                        }
                        await axios.get(`http://localhost:8081/api/user/nick/${to}`)
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
                            M.toast({html: `<b>New chat with ${user.data.nick}</b>`, classes: "teal lighten-1"});
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })

            }, 1000);
        }else {
            setCurrentTime(1);
        }
    }, [requestChat, currentTime])

    //Start request chat
    const startRequestChat = async () => {
        nProgress.start();
        await axios.post("http://localhost:8081/api/chats/wait/", {id: user.id})
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

    //Cancel request chat
    const cancelRequestChat = async () => {
        nProgress.start();
        await axios.post("http://localhost:8081/api/chats/cancel/", {id: user.id})
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

    return (
        <ChatContexts.Provider value={{
            chat,
            setChat,
            requestChat,
            startRequestChat,
            cancelRequestChat,
            currentTime
        }}>
            {children}
        </ChatContexts.Provider>
    )

}