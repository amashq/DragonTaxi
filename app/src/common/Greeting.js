import React, {Component} from 'react';
import DragonImg from '../img/Dragon.png';
import {Link} from "react-router-dom";

class Greeting extends Component {


    render() {
        return (
            <div>
                <header>
                <p className="naming-company-locating" >DRAGON TAXI</p>
            </header>

            <div className = "col-md-auto text-center buttonn">
            <Link to="/order" id = "button_order" name = "singlebutton"
                className = "btn btn-primary"> ЗАКАЗАТЬ ТАКСИ
            </Link>
            </div>

             <div>
             <figure align="center"><img src={DragonImg} alt="Dragon"/></figure>
              </div>
            </div>
    );
    }
    }
export default Greeting;