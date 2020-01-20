import React, {Component} from 'react';
import Button from "react-bootstrap/Button";

class AddUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const User = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.handleSubmit(User);
    }

    render() {

        return (
            <div>

                <form >
                    <div className="form-group">
                        <label htmlFor="inputUsername">Логин</label>
                        <input type="text" className="form-control" id="inputUsername"
                               value={this.state.username} name="username"
                               onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Пароль</label>
                        <input type="text" className="form-control" id="inputPassword"
                               value={this.state.password} name="password"
                               onChange={this.handleChange} required/>
                    </div>


                    <Button id="saveDragonButton" className="saveEdit btn btn-primary" onClick={this.handleSubmit}>Сохранить изменения</Button>
                    <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>

                </form>

            </div>
        );
    }
}
export default AddUser;