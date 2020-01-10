import React, {Component} from 'react';
import OrderDataService  from "../../service/OrderDataService";
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import EditOrder from "./EditOrder";

// import {connect} from "react-redux";
// import { GET_ORDERS } from "../../actions/types";

class OrderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: [],
            dragons: [],
            startAddress: '',
            message: null
        };
        this.deleteRowOrder = this.deleteRowOrder.bind(this);
        this.refreshOrders = this.refreshOrders.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.getOrderForUpdateOrder = this.getOrderForUpdateOrder.bind(this);
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
                this.getOrderForUpdateOrder(id);
            }
        );

    }

    getOrderForUpdateOrder(id) {
        OrderDataService.getOrder(id).then(
            response => {
                this.setState({ order: response.data });
                this.openEditModal();
            }
        );
    }


    addOrder() {
        this.props.history.push(`/order`)
    }

    refreshOrders() {
        OrderDataService.getAllOrders()
            .then(
                response => {
                    this.setState({ orders: response.data })
                }
            );
    }

    deleteRowOrder(row) {
        OrderDataService.deleteOrder(row)
            .then(
                response => {
                    this.setState({ message: `Заказ удален успешно` });
                    this.refreshOrders()
                }
            )
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
        );
    };

    handleCancel = () => {
        this.setState({ isOpen: false });
    };


    operateFormatter(cell, row) {
        return (
            <div>
                <a className="lan-edit"
                   onClick={() => this.updateOrder(row.id, row.classD) }
                   title="Edit">
                    <i className="fas fa-pen ui" style={{"marginRight":"5px"}}></i>
                </a>
                <a className="lan-remove"
                   onClick={() => this.deleteRowOrder(row) }
                    // href=" "
                   title="Remove">
                    <i className="fa fa-trash ui"></i>
                </a>
            </div>);
    }

    render() {
        const options = {
        //     afterInsertRow: this.onAfterInsertRow,   // A hook for after insert rows
        //     insertBtn: this.createCustomInsertButton,
        //     addModal: this.createAddModal,
        //     deleteRowOrder: this.props.deleteRowOrder
           deleteRowOrder: this.deleteRowOrder.bind(this)
        };


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
                                        isKey hidden searchable={ false }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Статус</TableHeaderColumn>
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
                    <TableHeaderColumn  dataField="classD" dataSort={ true }
                                        headerAlign='center' dataAlign='center'>Класс дракона</TableHeaderColumn>
                    <TableHeaderColumn dataField="dragon" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Дракон</TableHeaderColumn>
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

// OrderBoard.propTypes = {
//     getAllOrders: PropTypes.func.isRequired
//     // ,
//     // deleteOrder: PropTypes.func.isRequired
// };



export default OrderBoard;
