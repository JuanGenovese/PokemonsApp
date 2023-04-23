import { Link } from "react-router-dom";

const Detail = () => {
    return(
        <>
            <h1>Esta es la vista de Detail</h1>
            <Link to="/home">
                <button>GO BACK!</button>
            </Link>
        </>
    )
}

export default Detail;