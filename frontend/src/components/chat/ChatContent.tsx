import { userInfo } from 'node:os';
import { useContext } from 'react';
import { ChatContexts } from '../../contexts/ChatContexts';
import { UserContexts } from '../../contexts/UserContexts';
import style from '../../styles/components/Chat.module.css';

const ChatContent = () => {

    const { chat } = useContext(ChatContexts);
    const { user } = useContext(UserContexts);

    return(
        <div className="card m-0 h-100">
            <div className="card-content h-100">
                <div className={style.chatContent}>
                    {chat ? (
                        <>
                        {chat.messages.map((msg) => {
                            {msg.from == user.nick ? (
                                <div className={style.chatMe}>
                                    <div>
                                        <img src="images/user.svg"/>
                                        <div>
                                            <p>
                                                {msg.message}
                                            </p>
                                            <small>2020-02-01 22:35</small>
                                        </div>
                                    </div>
                                </div>
                            ): (
                                <div className={style.chatHe}>
                                    <div>
                                        <img src="images/user.svg"/>
                                        <div>
                                            <p>
                                                {msg.message}
                                            </p>
                                            <small>2020-02-01 22:35</small>
                                        </div>
                                    </div>
                                </div>
                            )}
                        })}
                        </>
                    ): (
                        <div className={`h-100 ${style.imgChat}`}>
                            <img src="images/undraw_mobile_testing_reah.svg"/>
                            <h6>Connect with others users</h6>
                        </div>
                    )}
                    
                </div>
                <div className={`${style.chatSendMsg}`}>
                    <div className="input-field">
                        <textarea id="textarea1" className="materialize-textarea" placeholder="Message"></textarea>
                    </div>
                    <div className="">
                        <button type="button" className="btn waves-effect waves-light deep-purple lighten-1 right" name="action">
                            <i className="material-icons center">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContent;