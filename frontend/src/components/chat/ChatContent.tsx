import style from '../../styles/components/Chat.module.css';

const ChatContent = () => {
    return(
        <div className="card m-0 h-100">
            <div className="card-content h-100">
                <div className={style.chatContent}>
                    <div className={style.chatMe}>
                        <div>
                            <img src="images/user.svg"/>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, perferendis?
                                </p>
                                <small>2020-02-01 22:35</small>
                            </div>
                        </div>
                    </div>
                    <div className={style.chatHe}>
                        <div>
                            <img src="images/user-2.svg"/>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, perferendis?
                                </p>
                                <small>2020-02-01 22:35</small>
                            </div>
                        </div>
                    </div>
                    <div className={style.chatHe}>
                        <div>
                            <img src="images/user-2.svg"/>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, perferendis?
                                </p>
                                <small>2020-02-01 22:35</small>
                            </div>
                        </div>
                    </div>
                    <div className={style.chatMe}>
                        <div>
                            <img src="images/user.svg"/>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, perferendis?
                                </p>
                                <small>2020-02-01 22:35</small>
                            </div>
                        </div>
                    </div>
                    <div className={style.chatMe}>
                        <div>
                            <img src="images/user.svg"/>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, perferendis?
                                </p>
                                <small>2020-02-01 22:35</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.chatSendMsg}`}>
                    <div className="input-field">
                        <textarea id="textarea1" className="materialize-textarea" placeholder="Message"></textarea>
                    </div>
                    <div className="">
                        <button type="button" className="btn waves-effect waves-light deep-purple lighten-1" name="action">
                            <i className="material-icons center">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContent;