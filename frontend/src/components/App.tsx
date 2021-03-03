import { useContext } from "react"
import { UserContexts } from "../contexts/UserContexts"
import Login from "./Login";

export default function App () {

    const { user } = useContext(UserContexts);

    return(
        <>
            {user ? (
                <h1>Hola</h1>
            ): (
                <Login/>
            )}
        </>
    )
}