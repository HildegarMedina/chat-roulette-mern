import next from "next";
import Link from 'next/link';
import Head from "next/head";
import { useContext } from "react";
import { UserContexts } from "../contexts/UserContexts";

const Header = () => {
    
    const { user, logout } = useContext(UserContexts);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="css/materialize.min.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <script src="js/materialize.min.js"></script>
            </Head>
            <header>
                <nav className="deep-purple lighten-1">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#!" className="brand-logo">Chat Roulette</a>
                            <ul className="right">
                                {user.id ? (
                                    <li>
                                        <button 
                                            type="button" 
                                            className="btn btn-small waves-effect waves-light red lighten-1"
                                            onClick={logout}
                                        >
                                        Logout
                                        </button>
                                    </li>
                                ): (
                                    <li>
                                        <Link href="/">
                                            <a href="/">Home</a>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;