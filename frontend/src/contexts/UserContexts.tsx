import axios from "axios";
import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import NProgress from 'nprogress';

//Interface
interface UserContextsData {
    user: {
        id: string,
        nick: string,
        age: number
    },
    setUser: (object) => void,
    changeForm: (e:any) => void,
    form: {
        nick: string,
        age: number
    },
    login: (e:any) => void,
    logout: () => void
}

//Export context
export const UserContexts = createContext({} as UserContextsData);

//Export provider
export function UserContextsProvider({children}) {

    //States
    const initialUser = {
        id: null,
        nick: null,
        age: null
    };
    const [form, setForm] = useState({
        nick: "",
        age: 0
    })
    const [user, setUser] = useState(initialUser)

    //Set nick
    const changeForm = (e:any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    //Login
    const login = (e:any) => {
        e.preventDefault();
        
        //Verify
        if (form.nick == null || form.nick == "") {
            M.toast({html: '<b>You must enter your nick</b>', classes: "red lighten-1"});
        }else if(form.age == null) {
            M.toast({html: '<b>You must enter your age</b>', classes: "red lighten-1"});
        }else if(form.age > 99 || form.age < 12) {
            M.toast({html: '<b>Something is wrong with your age </b>', classes: "red lighten-1"});
        }else {
            NProgress.start();
            axios.post('http://localhost:8081/api/user', form)
            .then(function (response) {
                console.log(response.data);
                if (response.data._id) {
                    setUser({
                        id: response.data._id,
                        nick: form.nick,
                        age: form.age
                    });
                    Cookies.set("id", response.data._id);
                    Cookies.set("nick", response.data.nick);
                    Cookies.set("age", response.data.age);
                    NProgress.done();
                    M.toast({html: '<b>Login success</b>', classes: "teal lighten-1"});
                }else {
                    NProgress.done();
                    M.toast({html: '<b>Login error</b>', classes: "red lighten-1"});
                }
            })
            .catch(function (error) {
                NProgress.done();
                M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
            });
        }

    }

    //Logout
    const logout = () => {
        NProgress.start();
        axios.delete(`http://localhost:8081/api/user/${user.id}`)
        .then(response => {
            if (response.data.status == "User deleted") {
                setUser(initialUser);
                Cookies.set("id", null); Cookies.set("nick", null); Cookies.set("age", null);
                NProgress.done();
                M.toast({html: '<b>Logout success</b>', classes: "teal lighten-1"});
            }else {
                NProgress.done();
                M.toast({html: '<b>Logout error</b>', classes: "red lighten-1"});
            }
        })
        .catch(err => {
            NProgress.done();
            M.toast({html: '<b>Something is wrong on the server</b>', classes: "red lighten-1"});
        })
    }

    return (
        <UserContexts.Provider value={{
            user,
            setUser,
            changeForm,
            form,
            login,
            logout
        }}>
            {children}
        </UserContexts.Provider>
    )
}
