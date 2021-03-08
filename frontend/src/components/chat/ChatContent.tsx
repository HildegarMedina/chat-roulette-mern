import { useContext, useEffect } from 'react';
import { ChatContexts } from '../../contexts/ChatContexts';
import { UserContexts } from '../../contexts/UserContexts';
import { Element } from 'react-scroll';
import style from '../../styles/components/Chat.module.css';

const ChatContent = () => {

    const { chat, formChat, setFormChat, sendMessage, scrollToWithContainer } = useContext(ChatContexts);
    const { user } = useContext(UserContexts);

    const textareaForm = (e) => {
        setFormChat(e.target.value);
    }

    return(
        <div className="card m-0 h-100">
            <div className="card-content h-100">
                <Element className={`element card-content ${style.chatContent}`} id="scroll-container" name="test" style={{
                    position: 'relative',
                    overflowY: 'auto'
                }}>
                    {chat ? (
                        <>
                        {chat.messages.map((msg, i)=> (
                            msg.from == user.nick ? (
                                <div className={style.chatMe} key={i}>
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
                            ):(
                                <div className={style.chatHe} key={i}>
                                    <div>
                                        <img src="images/user-2.svg"/>
                                        <div>
                                            <p>
                                                {msg.message}
                                            </p>
                                            <small>2020-02-01 22:35</small>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}


                            <Element name="scroll-container-second-element">
                            </Element>
    
                        </>
                    ): (
                        <div className={`h-100 ${style.imgChat}`}>
                            <img src="images/undraw_mobile_testing_reah.svg"/>
                            <h6>Connect with others users</h6>
                        </div>
                    )}
                </Element>
                <div className={`${style.chatSendMsg}`}>
                    <div className="input-field">
                        {chat ? (
                            <textarea id="textarea1" className="materialize-textarea" name="msg" placeholder="Message" onChange={textareaForm} value={formChat}></textarea>
                        ): (
                            <textarea id="textarea1" className="materialize-textarea" placeholder="Message" disabled></textarea>
                        )}
                    </div>
                    <div className="">
                        {chat ? (
                            <button type="button" 
                                    onClick={()=>{sendMessage(); scrollToWithContainer()}}
                                    className="btn waves-effect waves-light deep-purple lighten-1 right" 
                                    name="action">
                                    <i className="material-icons center">send</i>
                            </button>
                        ): (
                            <button type="button" 
                                    className="btn waves-effect waves-light deep-purple lighten-1 right disabled" 
                                    name="action">
                                <i className="material-icons center">send</i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContent;