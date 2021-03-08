import { useContext, useEffect } from 'react';
import { ChatContexts } from '../../contexts/ChatContexts';
import { UserContexts } from '../../contexts/UserContexts';
import style from '../../styles/components/Chat.module.css';

const CardProfile = () => {

    const { user } = useContext(UserContexts);
    const { chat, requestChat, startRequestChat, cancelRequestChat, currentTime, skipChat, exitChat } = useContext(ChatContexts);

    return (
        <>
            <div className={`card mt-2 mb-0 ${style.cardMessages}`}>
                <div className={style.profileImgContainer}>
                    <figure className={style.profileImg}>
                        <img src="images/user.svg"/>
                    </figure>
                </div>
                <div className={style.userTitle}>{user.nick}</div>
                <div className="card-content">
                <p>
                    <b>Age:</b> {user.age}
                </p>
                </div>
            </div>

            {chat && (
                <div className={`card mt-2 mb-0 ${style.cardMessages}`}>
                    <div className={style.profileImgContainer}>
                        <figure className={style.profileImg}>
                            <img src="images/user-2.svg"/>
                        </figure>
                    </div>
                    <div className={`${style.userTitle} ${style.other}`}>{chat.user.nick}</div>
                    <div className="card-content">
                    <p>
                        <b>Age:</b> {chat.user.age}
                    </p>
                    </div>
                </div>
            )}

            <div className={`my-0 position-relative ${style.groupButton}`}>
                {requestChat == 0 && (
                    <button 
                        type="button" 
                        className="btn btn-large waves-effect waves-light deep-purple lighten-1" 
                        onClick={startRequestChat}
                        style={{width: "100%"}}
                    >
                        <b>Start</b>
                        <i className="material-icons right">play_arrow</i>
                    </button>
                )}
                {requestChat == 1 && (
                    <button 
                        type="button" 
                        className={`btn btn-large waves-effect waves-light deep-purple lighten-2 ${style.waitingButton}`} 
                        onClick={cancelRequestChat}
                        style={{width: "100%"}}
                    >
                        <b>
                            <span>Waiting</span> 
                            <span>Cancel</span>
                            <small>
                                <span style={{textTransform: 'lowercase'}}>( {currentTime}s )</span>
                            </small>
                        </b>
                        
                        <div className="progress progress-bar-button">
                            <div className="indeterminate"></div>
                        </div>
        
                    </button>
                )}
                {requestChat == 2 && (
                    <div>
                        <button
                            type="button"
                            className="btn btn-large waves-effect waves-light red lighten-1"
                            style={{width: "50%"}}
                            onClick={exitChat}
                        >
                            <i className="material-icons left">close</i>
                            <b>Exit</b>
                        </button>
                        <button
                            type="button"
                            className="btn btn-large waves-effect waves-light blue darken-2"
                            style={{width: "50%"}}
                            onClick={skipChat}
                        >
                            <b>Skip</b>
                            <i className="material-icons right">skip_next</i>
                        </button>
                    </div>
                )}
            </div>
            
        </>
    )
}

export default CardProfile;