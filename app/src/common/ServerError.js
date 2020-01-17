import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

class NotFound extends Component {
    render() {
        return (
            <div className="server-error-page">
                <h1 className="server-error-title">
                    500
                </h1>
                <div className="server-error-desc">
                    Упс! На сервере произошла ошибка.
                </div>
                <Link to="/"><Button className="server-error-go-back-btn not-found-btn" type="primary" size="large">На главную</Button></Link>
            </div>
        );
    }
}

export default NotFound;