import CardProfile from './CardProfile';
import ChatContent from './ChatContent';
import style from '../../styles/components/Chat.module.css';
import { ChatContextsProvider } from '../../contexts/ChatContexts';

const Chat = () => {

    return(
         <ChatContextsProvider>
            <div className="container h-100">
                
                <div className="row py-3 h-100">
                    <div className="col s12 m8 l9 h-100">
                        <ChatContent/>
                    </div>
                    <div className={`col s12 m4 l3 h-100 ${style.containerProfile}`}>
                        <CardProfile/>
                    </div>
                </div>
                
            </div>
         </ChatContextsProvider>
    )
}

export default Chat;