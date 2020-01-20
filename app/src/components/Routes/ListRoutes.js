import React, {Component} from 'react';
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import RouteDataService from "../../service/RouteDataService";
import AddRoute from "./AddRoute";
import EditRoute from "./EditRoute";
import ServerError from "../../common/ServerError";

class ListRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        };
        this.addRoute = this.addRoute.bind(this);
        this.handleAddRoute = this.handleAddRoute.bind(this);
        this.handleEditRoute = this.handleEditRoute.bind(this);
    }

    componentDidMount() {
        RouteDataService.getRoutes()
            .then(response => {
                    this.setState({ routes: response.data })}
            ).catch(error => {
                this.setState({ serverError: true })
        });
    }

    addRoute() {
        this.openAddModal();
    }

    handleAddRoute(route){
        RouteDataService.addRoute(route)
            .then(response => {
                this.setState({ message: `Маршрут добавлен` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            } ).catch(error => {
            this.setState({ serverError: true })
        })
    }

    state = {
        isOpen: false
    };

    openAddModal = () => {
        this.setState({ title: 'Добавление маршрута' });
        this.setState({ children: <AddRoute handleCancel={this.handleCancel}
                                             handleSubmit={this.handleAddRoute}/> });
        this.setState({ isOpen: true });
    };


    handleCancel = () => {
        this.setState({ isOpen: false });
    };

    deleteRowRoute(row) {
        RouteDataService.deleteRoute(row)
            .then(response => {
                    this.setState({ message: `Маршрут успешно удален` });
                    this.componentDidMount()
                }).catch(error => {
            this.setState({ serverError: true })
        })
    }

    updateRoute(id) {
        RouteDataService.getRoute(id).then(
            response => {
                this.setState({ route: response.data });
                this.openEditModal();
            }).catch(error => {
            this.setState({ serverError: true })
        })
    }

    openEditModal = () => {
        this.setState({ title: 'Изменение данных маршрута' });
        this.setState({ children: <EditRoute route={this.state.route}
                                              handleCancel={this.handleCancel}
                                              handleSubmit={this.handleEditRoute}/> });
        this.setState({ isOpen: true });
    };

    handleEditRoute(route) {
        RouteDataService.updateRoute(route).then(
            response => {
                this.setState({ message: `Данные маршрута изменены` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            }).catch(error => {
            this.setState({ serverError: true })
        })
    };

    operateFormatter(cell, row) {
        return (
            <div align="center">

                <a className="lan-edit"
                   onClick={() => this.updateRoute(row.id) }
                   title="Edit">
                    <i className="fas fa-pen ui" style={{"marginRight":"5px"}}></i>
                </a>
                <a className="lan-remove"
                   onClick={() => this.deleteRowRoute(row) }
                   title="Remove">
                    <i className="fa fa-trash ui"></i>
                </a>
            </div>);
    }

    render() {

        if(this.state.serverError) {
            return <ServerError />;
        }


        return (
            <div className="container mt-2 mb-2">

                <InsertButton
                    btnText="Добавить маршрут"
                    className="btn btn-default btn-primary addForm"
                    onClick={this.addRoute}/>

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <BootstrapTable data={ this.state.routes } search>
                    <TableHeaderColumn  dataField="pointOfDeparture" dataSort={ true }  isKey={true} headerAlign='center'
                                        dataAlign='center'>Откуда</TableHeaderColumn>
                    <TableHeaderColumn  dataField="pointOfArrival" dataSort={ true } headerAlign='center'
                                        dataAlign='center'>Куда</TableHeaderColumn>
                    <TableHeaderColumn  dataField="cost" dataSort={ true } headerAlign='center'
                                        dataAlign='center'>Стоимость</TableHeaderColumn>
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

export default ListRoutes;