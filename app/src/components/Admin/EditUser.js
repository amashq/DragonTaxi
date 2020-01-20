import React, {Component} from 'react';
import Button from "react-bootstrap/Button";

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.user.id,
            username: this.props.user.username,
            admin: this.props.user.admin,
            manager: this.props.user.manager,
            driver: this.props.user.driver,
            draconolog: this.props.user.draconolog,
            cashier: this.props.user.cashier,
            roles: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.admin) {
            this.state.roles.push("ADMIN")
        }
        if (this.state.manager) {
            this.state.roles.push("MANAGER")
        }
        if (this.state.cashier) {
            this.state.roles.push("CASHIER")
        }
        if (this.state.draconolog) {
            this.state.roles.push("DRAGONOLOG")
        }
        if (this.state.driver) {
            this.state.roles.push("DRIVER")
        }

        const User = {
            id: this.state.id,
            username: this.state.username,
            roles: this.state.roles
        };
        this.props.handleSubmit(User);
    }

    render() {

        return (
            <div>

                <form onSubmit={ this.props.updateUser}>

                    <div className="form-group">
                        <label hidden htmlFor="inputId">Id пользователя</label>
                        <input hidden type="text" className="form-control" id="inputId"
                               value={this.state.id} name="id"
                               onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUsername">Логин</label>
                        <input type="text" className="form-control" id="inputUsername"
                               value={this.state.username} name="username"
                               onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Admin">Админ
                        <input type="checkbox" className="form-control" id="Admin"
                               checked={this.state.admin} name="admin"
                               onChange={this.handleChange} required/></label>

                        <label htmlFor="Manager">Менеджер
                            <input type="checkbox" className="form-control" id="Manager"
                                   checked={this.state.manager} name="manager"
                                   onChange={this.handleChange} required/></label>

                        <label htmlFor="Dragonolog">Драконолог
                            <input type="checkbox" className="form-control" id="Dragonolog"
                                   checked={this.state.draconolog} name="draconolog"
                                   onChange={this.handleChange} required/></label>

                        <label htmlFor="Cashier">Кассир
                            <input type="checkbox" className="form-control" id="Cashier"
                                   checked={this.state.cashier} name="cashier"
                                   onChange={this.handleChange} required/></label>

                        <label htmlFor="Driver">Водитель
                            <input type="checkbox" className="form-control" id="Driver"
                                   checked={this.state.driver} name="driver"
                                   onChange={this.handleChange} required/></label>
                    </div>

                    <Button id="saveDragonButton" className="saveEdit btn btn-primary" onClick={this.handleSubmit}>Сохранить изменения</Button>
                    <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>

                </form>

            </div>
        );
    }
}
export default EditUser;