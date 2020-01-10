import React, {Component} from 'react';
import Logo from '../img/IG.png';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (

            <nav className="navbar navbar-light bg-faded justify-content-end">

                <nav className="nav navbar-nav navbar-left">
                    <a href="/"><img src={Logo} alt="Dragon taxi"/></a>
                </nav>

                <div className="nav navbar-nav navbar-right" id="navbar-main">

                    <ul className="navbar navbar-right">
                        <li className="nav-item">
                            <a className="nav-link" href="/about">О компании
                                <span className="sr-only"></span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-link"> Услуги
                                <span className="sr-only"></span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contacts" className="nav-link">Контакты
                                <span className="sr-only"></span>
                            </Link>
                        </li>
                        <li className="buttonprivate">
                            <a className="btn btn-outline-secondary" href="/login">Личный кабинет
                                <span className="sr-only"></span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/listOrders">Заказы
                                <span className="sr-only"></span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/listDragons">Драконы
                                <span className="sr-only"></span>
                            </a>
                        </li>


                        <li className="buttonprivate">
                        </li>

                    </ul>
                    <div id="menu-line"></div>
                </div>
            </nav>

    );
    }
    }

export default Navbar;