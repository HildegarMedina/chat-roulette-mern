import { useContext } from 'react';
import { UserContexts } from '../../contexts/UserContexts';
import CardProfile from './CardProfile';
import ChatContent from './ChatContent';
import style from '../../styles/components/Chat.module.css';

const Chat = () => {

    const { user } = useContext(UserContexts);

    return(
        <div className="container h-100">
            
            <div className="row py-3 h-100">
                <div className={`col s12 m4 l3 h-100 ${style.containerProfile}`}>
                    <CardProfile/>
                </div>
                <div className="col s12 m8 l9 h-100">
                    <ChatContent/>
                </div>
            </div>
            
        </div>
    )
}

export default Chat;