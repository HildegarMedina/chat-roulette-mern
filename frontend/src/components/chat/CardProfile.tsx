import { useContext, useEffect } from 'react';
import { ChatContexts } from '../../contexts/ChatContexts';
import { UserContexts } from '../../contexts/UserContexts';
import style from '../../styles/components/Chat.module.css';

const CardProfile = () => {

    const { user } = useContext(UserContexts);
    const { chat, setChat } = useContext(ChatContexts);
 
    useEffect(()=> {
        
    }, [])

    return (
        <>
            <div className="card mt-0 mb-2">
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
                <div className="card mt-2 mb-0">
                    <div className={style.profileImgContainer}>
                        <figure className={style.profileImg}>
                            <img src="images/user-2.svg"/>
                        </figure>
                    </div>
                    <div className={`${style.userTitle} ${style.other}`}>{chat.user.nick}</div>
                    <div className="card-content">
                    <p>
                        <b>Age:</b> {chat.user.id}
                    </p>
                    </div>
                </div>
            )}

            <div className="my-0">
                {chat ? (
                    <button 
                        type="button" 
                        className="btn btn-large waves-effect waves-light blue-grey darken-2" 
                        style={{width: "100%"}}
                    >
                        <b>Restart</b>
                        <i className="material-icons right">rotate_left</i>
                    </button>
                ): (
                    <button 
                        type="button" 
                        className="btn btn-large waves-effect waves-light deep-purple lighten-1" 
                        style={{width: "100%"}}
                    >
                        <b>Start</b>
                        <i className="material-icons right">play_arrow</i>
                    </button>
                )}
            </div>
            
        </>
    )
}

export default CardProfile;