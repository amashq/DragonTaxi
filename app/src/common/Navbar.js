import React, {Component} from 'react';
import Logo from '../img/IG.png';
import { Link } from "react-router-dom";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
            this.props.onLogout();
    }

    render() {
        let menuItems;
        if(this.props.isManager) {
            menuItems = [
                <ul key={0} className="navbar navbar-right">
                    <li key="listOrders" className="nav-item">
                        <a className="nav-link" href="/listOrders">Заказы
                            <span className="sr-only"></span>
                        </a>
                    </li>
                    <li key="logout" className="buttonprivate">
                        <a className="btn btn-outline-secondary" onClick={this.handleLogoutClick}>Выйти
                            <span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            ]
        } else if(this.props.isCashier) {
            menuItems = [
                <ul key={1} className="navbar navbar-right">
                    <li key="listRoutes" className="nav-item">
                        <Link to="/listRoutes" key="/listRoutes" className="nav-link" >Маршруты
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="logout" className="buttonprivate">
                        <a className="btn btn-outline-secondary" onClick={this.handleLogoutClick}>Выйти
                            <span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            ]
        } else if(this.props.isDragonolog) {
            menuItems = [
                <ul key={2} className="navbar navbar-right">
                    <li key="listDragons" className="nav-item">
                        <Link to="/listDragons" key="/listDragons" className="nav-link" >Драконы
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="logout" className="buttonprivate">
                        <a className="btn btn-outline-secondary" onClick={this.handleLogoutClick}>Выйти
                            <span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            ]
        } else if(this.props.isDriver) {
            menuItems = [
                <ul key={3} className="navbar navbar-right">
                    <li key="listOrders" className="nav-item">
                        <Link to="/allOrders" key="/allOrders" className="nav-link" >Все заказы
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="logout" className="buttonprivate">
                        <a className="btn btn-outline-secondary" onClick={this.handleLogoutClick}>Выйти
                            <span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            ]
        } else if(this.props.isAdmin) {
            menuItems = [
                <ul key={4} className="navbar navbar-right">
                    <li key="users" className="nav-item">
                        <Link to="/users" key="/users" className="nav-link" >Все пользователи
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="logout" className="buttonprivate">
                        <a className="btn btn-outline-secondary" onClick={this.handleLogoutClick}>Выйти
                            <span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            ]
        } else {
            menuItems = [
                <ul key={5} className="navbar navbar-right">
                    <li key="about" className="nav-item">
                        <Link to="/about" key="/about" className="nav-link">О компании
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="services" className="nav-item">
                        <Link key="/services" to="/services" className="nav-link"> Услуги
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="contacts" className="nav-item">
                        <Link to="/contacts" className="nav-link">Контакты
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                    <li key="login" className="buttonprivate">
                        <Link to="/login" className="btn btn-outline-secondary" >Личный кабинет
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                </ul>
            ]
        }

        return (

            <nav className="navbar navbar-light bg-faded justify-content-end">
                <nav className="nav navbar-nav navbar-left">
                    <a href="/"><img src={Logo} alt="Dragon taxi"/></a>
                </nav>

                <div className="nav navbar-nav navbar-right" id="navbar-main">
                    {menuItems}
                    <div id="menu-line"></div>
                </div>
            </nav>
    );
    }
    }
export default Navbar;