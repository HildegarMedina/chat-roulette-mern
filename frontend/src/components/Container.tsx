import Header from "./Header"
import Footer from "./Footer"

const Container = ({children}) => {
    return(
        <>
            <Header/>

            <main>
                {children}
            </main>

            <Footer/>
        </>
    )
}

export default Container;