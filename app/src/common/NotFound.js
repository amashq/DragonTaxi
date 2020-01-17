import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    Страница не найдена.
                </div>
                <Link to="/"><Button className="go-back-btn not-found-btn" type="primary" size="large">На главную</Button></Link>
            </div>
        );
    }
}

export default NotFound;