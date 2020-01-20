import React, {Component} from 'react';
import OrderDataService  from "../../service/OrderDataService";
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import NotFound from "../../common/NotFound";
import ServerError from "../../common/ServerError";
import DriverDataService from "../../service/DriverDataService";
import DetailOrder from "./DetailOrder";

class AllOrders extends Component {


    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: [],
            message: null,
            notFound: '',
            serverError: ''
        };
        this.refreshOrders = this.refreshOrders.bind(this);
        this.getOrder = this.getOrder.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.refreshOrders();
    }

    refreshOrders() {
        DriverDataService.getMyOrders(this.props.currentUser).then(
            response => {
                this.setState({ orders: response.data })
            }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }

    getOrder(id) {
        OrderDataService.getOrder(id).then(response => {
            this.setState({ order: response.data })
            this.openDetailModal();
        }).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }

    openDetailModal = () => {
        this.setState({ title: 'Данные заказа' });
        this.setState({ children: <DetailOrder order={this.state.order}
                                             handleCancel={this.handleCancel}/> });
        this.setState({ isOpen: true });
    };

    handleCancel = () => {
        this.setState({ isOpen: false });
    };

    confirmOrder(order) {
        OrderDataService.updateStatusOrder(order).then(
            response => {
                this.refreshOrders()
            }
        ).catch(error => {
            if(error.status === 500) {
                this.setState({ serverError: true })
            } else {
                this.setState({ notFound: true });
            }
        });
    }

    operateFormatter(cell, row) {
        if (row.status === "Получен") {
        return (
            <div align="center">
                <a className="lan-edit" title="Просмотреть"
                   onClick={() => this.getOrder(row.id) }>
                    <i className="fa fa-eye ui" style={{"marginRight":"5px"}}></i>
                </a>
                <a className="lan-edit" title="Подтвердить выполнение"
                   onClick={() => this.confirmOrder(row) }>
                    <i className="fa fa-plus-circle ui" style={{"marginRight":"5px"}}></i>
                </a>
                </div>);
        } else if (row.status === "Отменен") {
            return (
                <div align="center">
                <a className="lan-edit disabled" title="Заказ отменен"
                   href="">
                    <i className="fa fa-minus-circle ui" style={{"marginRight":"5px"}}></i>
                </a>
            </div>);
        } else {
            return (
                <div align="center">
                    <a className="lan-edit" title="Просмотреть"
                       onClick={() => this.getOrder(row.id) }>
                        <i className="fa fa-eye ui" style={{"marginRight":"5px"}}></i>
                    </a>
                    <a className="lan-edit disabled" title="Выполнен" href="">
                        <i className="fa  fa-check-circle ui" style={{"marginRight":"5px"}}></i>
                    </a>
                </div>);
        }
    }

    render() {

        function showNameCustomer(cell, row) {
            return cell.nameCustomer;
        }

        function showPhoneNumber(cell, row) {
            return cell.phoneNumber;
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

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <BootstrapTable сlassName=" "
                                data={ this.state.orders }
                                pagination search>
                    <TableHeaderColumn  dataField="id" dataSort={ true }
                                        headerAlign='center' dataAlign='center'
                                        isKey searchable={ false }>№ заказа</TableHeaderColumn>
                    <TableHeaderColumn dataField="customer"
                                       dataFormat={showNameCustomer} dataSort={ true }
                                       headerAlign='center' dataAlign='center'
                                       sortFunc = {sortByNameCustomer}>Клиент</TableHeaderColumn>
                    <TableHeaderColumn dataField="customer"
                                       dataFormat={showPhoneNumber} dataSort
                                       headerAlign='center' dataAlign='center'
                                       sortFunc={ sortByPhoneNumber }>Телефон</TableHeaderColumn>
                    <TableHeaderColumn dataField="timeTravel" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Дата</TableHeaderColumn>
                    <TableHeaderColumn dataField="startAddress" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Откуда</TableHeaderColumn>
                    <TableHeaderColumn dataField="destAddress" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Куда</TableHeaderColumn>
                    <TableHeaderColumn dataField="dragon" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Дракон</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={(cell, row) => this.operateFormatter(cell, row)}
                                       headerAlign='center' data-align="center" >Выполнен</TableHeaderColumn >
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

export default AllOrders;