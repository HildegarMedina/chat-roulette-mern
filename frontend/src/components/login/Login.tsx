import { useContext } from "react";
import { UserContexts } from "../../contexts/UserContexts";

const Login = () => {

    const { changeForm, login } = useContext(UserContexts);

    return(
        <div className="container">
            <div className="row">
                <div className="col s12 m5 offset-m3">
                <h2 className="header">Login</h2>
                <div className="card horizontal">
                    <div className="card-stacked">
                    <div className="card-content">
                        <form action="" method="POST" onSubmit={login}>
                            <div className="input-field">
                                <input id="nick" type="text" name="nick" className="validate" onChange={changeForm}/>
                                <label htmlFor="nick">Nick</label>
                            </div>
                            <div className="input-field">
                                <input id="age" type="number" name="age" min="12" max="99" className="validate" onChange={changeForm}/>
                                <label htmlFor="age">Age</label>
                            </div>
                            <button type="submit" className="btn waves-effect waves-light deep-purple lighten-1" name="action">Login
                                <i className="material-icons right">send</i>
                            </button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login;