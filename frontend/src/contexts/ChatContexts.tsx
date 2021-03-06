import { createContext, useState } from "react";

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
    setChat: (typeChat) => void;
}

//Chat context
export const ChatContexts = createContext({} as ChatContextsData);

//Chat context provider
export function ChatContextsProvider({children}) {

    //States
    const [chat, setChat] = useState(null);

    return (
        <ChatContexts.Provider value={{
            chat,
            setChat
        }}>
            {children}
        </ChatContexts.Provider>
    )

}