import { Link } from "react-router-dom"


const Navbar =()=>{

    return(
        <nav>
            <div className="container">
                <Link to="/seedoc">
                    <h1>DoctorPage</h1>
                </Link>


                <Link to="/DoctorHome"> test </Link>
            </div>
        </nav>
    )
}

export default Navbar