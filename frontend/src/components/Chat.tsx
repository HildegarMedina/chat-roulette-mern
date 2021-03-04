import { useContext } from 'react';
import { UserContexts } from '../contexts/UserContexts';
import style from '../styles/components/Chat.module.css';

const Chat = () => {

    const { user } = useContext(UserContexts);

    return(
        <div className="container">
            
            <div className="row my-3">
                <div className="col s12 m4 l3">
                    <div className="card">
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

                    <div className="card">
                        <div className={style.profileImgContainer}>
                            <figure className={style.profileImg}>
                                <img src="images/user-2.svg"/>
                            </figure>
                        </div>
                        <div className={`${style.userTitle} ${style.other}`}>{user.nick}</div>
                        <div className="card-content">
                        <p>
                            <b>Age:</b> {user.age}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Chat;