import { Link } from "react-router-dom"
import "../index.css"


const contractNavbar =()=>{

  
    return(
        <nav>
            <div className="container">
                

              
                <Link className="doctor-buttons" to="/" ><h3>Log Out</h3></Link>
               


            </div>
        </nav>
    )
}

export default contractNavbar