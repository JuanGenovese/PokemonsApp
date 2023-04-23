import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
            <h1>Landing</h1>
            <Link to="/home">
                <button> Comencemos... </button>
            </Link>
           
        </>
    )
}

export default Landing;