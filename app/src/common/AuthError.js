import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class AuthError extends Component {
    render() {
        return (
            <div className="server-error-page">
                <h1 className="server-error-title">
                    Упс!
                </h1>
                <div className="server-error-desc">
                    Неправильный логин или пароль.
                </div>
                <Link to="/login"><Button className="server-error-go-back-btn not-found-btn" type="primary" size="large">На главную</Button></Link>
            </div>
        );
    }
}

export default AuthError;