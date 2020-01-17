import React, {Component} from 'react';
import OrderDataService  from "../../service/OrderDataService";
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import EditOrder from "./EditOrder";
import NotFound from "../../common/NotFound";
import ServerError from "../../common/ServerError";
import DriverDataService from "../../service/DriverDataService";

class OrderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: [],
            dragons: [],
            drivers: [],
            message: null,
            notFound: '',
            serverError: ''
        };
        this.deleteRowOrder = this.deleteRowOrder.bind(this);
        this.refreshOrders = this.refreshOrders.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.getOrderForUpdateOrder = this.getOrderForUpdateOrder.bind(this);
        this.getDrivers = this.getDrivers.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.refreshOrders();
    }

    updateOrder(id, classD) {
        OrderDataService.getDragons(classD).then(
            response => {
                this.setState({ dragons: response.data });
               this.getDrivers();
                this.getOrderForUpdateOrder(id);
            }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }

    getDrivers(){
        DriverDataService.getFreeDriver().then(
            response => {
                this.setState({ drivers: response.data });
            }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });

    }

    getOrderForUpdateOrder(id) {
        OrderDataService.getOrder(id).then(
            response => {
                this.setState({ order: response.data });
                this.openEditModal();
            }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }


    addOrder() {
        this.props.history.push(`/order`)
    }

    refreshOrders() {
        OrderDataService.getAllOrders()
            .then(response => {
                    this.setState({ orders: response.data })
                }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }

    deleteRowOrder(row) {
        OrderDataService.deleteOrder(row)
            .then(response => {
                    this.setState({ message: `Заказ удален успешно` });
                    this.refreshOrders()
                }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }

    state = {
        isOpen: false,
        title: '',
        children: ''
    };

    openEditModal = () => {
        this.setState({ title: 'Редактирование заказа' });
        this.setState({ children: <EditOrder order={this.state.order}
                                             dragons={this.state.dragons}
                                             drivers={this.state.drivers}
                                             handleCancel={this.handleCancel}
                                             handleSubmit={this.handleSubmit}/> });
        this.setState({ isOpen: true });
    };


    handleSubmit(json) {
        console.log(json);
        OrderDataService.updateOrder(json).then(
            response => {
                console.log(response.data);
                this.setState({ message: `Заказ обновлен` });
                this.refreshOrders();
                this.setState({ isOpen: false });
            }
        ).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    };

    handleCancel = () => {
        this.setState({ isOpen: false });
    };


    operateFormatter(cell, row) {
        return (
            <div align="center">
                <a className="lan-edit" title="Edit"
                   onClick={() => this.updateOrder(row.id, row.classD) }>

                    <i className="fas fa-pen ui" style={{"marginRight":"5px"}}></i>
                </a>
                <a className="lan-remove" title="Remove"
                   onClick={() => this.deleteRowOrder(row) }>
                    <i className="fa fa-trash ui"></i>
                </a>
            </div>);
    }

    render() {

        function showNameCustomer(cell, row) {
            return cell.nameCustomer;
        }

        function showPhoneNumber(cell, row) {
            return cell.phoneNumber;
        }

        function showNameDriver(cell, row) {
            console.log(cell);
            if (cell===null){
                return null;
            } else {
            return cell.nameDriver; }
        }

        function sortByPhoneNumber(a, b, order, field) {
            if (order === 'desc') {
                if (a[field].phoneNumber > b[field].phoneNumber) { return -1;
                } else if (a[field].phoneNumber < b[field].phoneNumber) { return 1;
                } return 0;
            }
            if (a[field].phoneNumber < b[field].phoneNumber) {return -1;
            } else if (a[field].phoneNumber > b[field].phoneNumber) { return 1;
            } return 0;
        }

        function sortByNameCustomer(a, b, order, field) {
            if (order === 'desc') {
                if (a[field].nameCustomer > b[field].nameCustomer) { return -1;
                } else if (a[field].nameCustomer < b[field].nameCustomer) { return 1;
                } return 0;
            }
            if (a[field].nameCustomer < b[field].nameCustomer) { return -1;
            } else if (a[field].nameCustomer > b[field].nameCustomer) { return 1;
            } return 0;
        }


        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            <div  className="container mt-2 mb-2">

                <InsertButton
                    btnText="Добавить заказ"
                    className="btn btn-default btn-primary addForm"
                    onClick={this.addOrder}/>

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <BootstrapTable сlassName=" "
                                data={ this.state.orders }
                                pagination search>
                    <TableHeaderColumn  dataField="id" dataSort={ true }
                                        headerAlign='center' dataAlign='center'
                                        isKey  searchable={ true }>№</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Статус</TableHeaderColumn>
                    <TableHeaderColumn dataField="customer"
                                       dataFormat={showNameCustomer} dataSort={ true }
                                       headerAlign='center' dataAlign='center' hidden
                                       sortFunc = {sortByNameCustomer}>Клиент</TableHeaderColumn>
                    <TableHeaderColumn dataField="customer" hidden
                                       dataFormat={showPhoneNumber} dataSort
                                       headerAlign='center' dataAlign='center'
                                       sortFunc={ sortByPhoneNumber }>Телефон</TableHeaderColumn>
                    <TableHeaderColumn dataField="timeTravel" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Дата</TableHeaderColumn>
                    <TableHeaderColumn dataField="startAddress" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Откуда</TableHeaderColumn>
                    <TableHeaderColumn dataField="destAddress" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Куда</TableHeaderColumn>
                    <TableHeaderColumn  dataField="classD" dataSort={ true } hidden
                                        headerAlign='center' dataAlign='center'>Класс дракона</TableHeaderColumn>
                    <TableHeaderColumn dataField="dragon" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Дракон</TableHeaderColumn>
                    <TableHeaderColumn dataField="driver" dataFormat={showNameDriver} dataSort={ true }
                                       headerAlign='center' dataAlign='center' >Водитель</TableHeaderColumn>
                    <TableHeaderColumn dataField="sum" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Итого</TableHeaderColumn>
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

export default OrderBoard;
