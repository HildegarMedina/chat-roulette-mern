import Head from "next/head";

const Header = () => {
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
                            <ul className="right hide-on-med-and-down">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Register</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;