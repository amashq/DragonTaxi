import React, {Component} from 'react';
import UserDataService from "../../service/UserDataService";
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import Button from "react-bootstrap/Button";
import OrderDataService from "../../service/OrderDataService";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: '',
            message: null
        };

        this.deleteUser = this.deleteUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addSubmit = this.addSubmit.bind(this);
    }

    componentDidMount() {
        UserDataService.getUsers().then(
            response => {
                console.log(response.data);
                this.setState({users: response.data});
            } ).catch(error => {
                this.setState({ serverError: true })
        });
    }

    updateUser(id) {
        UserDataService.getUser(id).then(
            response => {
                console.log(response.data);
                this.setState({ user: response.data });
                this.openEditModal();
            }
        );
    }

    deleteUser(row) {
        UserDataService.deleteUser(row)
            .then(response => {
                this.setState({ message: `Пользователь удален` });
                // this.componentDidMount()
            }).catch(error => {
            this.setState({ serverError: true })
        });
    }

    state = {
        isOpen: false,
        title: '',
        children: ''
    };

    openAddModal = () => {
        this.setState({ title: 'Добавление пользователя' });
        this.setState({ children: <AddUser
                                            handleCancel={this.handleCancel}
                                            handleSubmit={this.addSubmit}/> });
        this.setState({ isOpen: true });
};

    addSubmit(user) {
        UserDataService.addUser(user).then(
            response => {
                this.setState({ message: `Пользователь добавлен` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            }
        );
    }

    openEditModal = () => {
        this.setState({ title: 'Изменение данных пользователя' });
        this.setState({ children: <EditUser user={this.state.user}
                                              handleCancel={this.handleCancel}
                                              handleSubmit={this.handleSubmit}/> });
        this.setState({ isOpen: true });
    };


    handleSubmit(user) {
        UserDataService.updateUser(user).then(
            response => {
                this.setState({ message: `Данные пользователя изменены` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            }
        );
    };

    handleCancel = () => {
        this.setState({ isOpen: false });
    };

    operateFormatter(cell, row) {
        return (
            <div align="center">
                <a className="lan-edit"
                   onClick={() => this.updateUser(row.id) }
                   title="Редактировать">
                    <i className="fas fa-pen ui" style={{"marginRight":"5px"}}></i>
                </a>
                <a className="lan-remove"
                   onClick={() => this.deleteUser(row) }
                   title="Удалить">
                    <i className="fa fa-trash ui"></i>
                </a>
            </div>);
    }

    render() {
        return (
            <div className="container mt-2 mb-2">

                <InsertButton
                    btnText="Добавить"
                    className="btn btn-default btn-primary addForm"
                    onClick={ this.openAddModal}/>

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <BootstrapTable data={ this.state.users }
                                pagination search multiColumnSearch>
                    <TableHeaderColumn  dataField="id" dataSort={ true }
                                        headerAlign='center' dataAlign='center'
                                        isKey hidden searchable={ false }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="username" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Пользователи</TableHeaderColumn>
                    <TableHeaderColumn dataField="roles" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Роли</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={(cell, row) => this.operateFormatter(cell, row)}
                                       headerAlign='center' data-align="center" >Действия</TableHeaderColumn >
                </BootstrapTable>


                <ModalWindow
                    title={this.state.title}
                    isOpen={this.state.isOpen}
                    onCancel={this.handleCancel}
                    children={this.state.children}
                >
                </ModalWindow>


            </div>
        );
    }
}

export default UserPage;