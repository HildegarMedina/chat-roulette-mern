import { useContext } from 'react';
import { UserContexts } from '../../contexts/UserContexts';
import style from '../../styles/components/Chat.module.css';

const CardProfile = () => {

    const { user } = useContext(UserContexts);

    return (
        <>
            <div className="card my-0">
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

            <div className="my-2">
                <button 
                    type="button" 
                    className="btn btn-large waves-effect waves-light deep-purple lighten-1" 
                    style={{width: "100%"}}
                >
                    <b>Start</b>
                    <i className="material-icons right">play_arrow</i>
                </button>
            </div>

            <div className="card my-0">
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
        </>
    )
}

export default CardProfile;