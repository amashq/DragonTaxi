import React, {Component} from 'react';
import DragonImg from '../img/Dragon.png';
// import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class Greeting extends Component {


    render() {
        return (
            <div>
                <header>
                <p className="naming-company-locating" >DRAGON TAXI</p>
            </header>

            <div className = "col-md-auto text-center buttonn">
            <Button id = "button_order" name = "singlebutton"
                className = "btn btn-primary" href="/order"> ЗАКАЗАТЬ ТАКСИ
            </Button>
            </div>


             <div>
             <figure align="center"><img src={DragonImg} alt="Dragon"/></figure>
              </div>

            </div>

    );
    }
    }

export default Greeting;