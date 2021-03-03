import axios from "axios";
import { createContext, useState } from "react";

//Interface
interface UserContextsData {
    user: object,
    changeForm: (e:any) => void,
    login: (e:any) => void
}

//Export context
export const UserContexts = createContext({} as UserContextsData);

//Export provider
export function UserContextsProvider({children}) {

    //States
    const formData = {
        nick: null,
        age: null
    }
    const [form, setForm] = useState(formData)
    const [user, setUser] = useState(null)

    //Set nick
    const changeForm = (e:any) => {
        if(e.target.name == "nick") {
            formData.nick = e.target.value;
        }else if(e.target.name == "age") {
            formData.age = e.target.value;
        }
        setForm(formData);
    }

    //Login
    const login = (e:any) => {
        e.preventDefault();
        
        //Verify
        if (form.nick == null) {
            M.toast({html: '<b>You must enter your nick</b>', classes: "red lighten-1"});
        }else if(form.age == null) {
            M.toast({html: '<b>You must enter your age</b>', classes: "red lighten-1"});
        }else if(form.age > 99 || form.age < 12) {
            M.toast({html: '<b>Something is wrong with your age </b>', classes: "red lighten-1"});
        }else {
            axios.post('http://localhost:8081/api/user', form)
            .then(function (response) {
                console.log(response.data);
                if (response.data._id) {
                    M.toast({html: '<b>Login success</b>', classes: "teal lighten-1"});
                    setUser({
                        id: response.data._id,
                        nick: form.nick,
                        age: form.age
                    })
                }else {
                    M.toast({html: '<b>Login error</b>', classes: "red lighten-1"});
                }
            })
            .catch(function (error) {
                M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
            });
        }

    }

    return (
        <UserContexts.Provider value={{
            user,
            changeForm,
            login
        }}>
            {children}
        </UserContexts.Provider>
    )
}
