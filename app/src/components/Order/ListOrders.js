// import React, {Component} from 'react';
// import PropTypes from "prop-types";
// import classnames from "classnames";
// import {connect} from "react-redux";
//
// import { deleteOrder } from "../../actions/orderActions";
// import {BootstrapTable, TableHeaderColumn, DeleteButton, InsertButton} from "react-bootstrap-table";
//
// class ListOrders extends Component {
//
//     render() {
//
//         const { orders } = this.props;
//
//         function deleteRowOrder(onUpdate, props){
//
//             console.log(onUpdate);
//             console.log(props);
//             deleteOrder(props);
//         }
//
//         const options = {
//         afterInsertRow: this.onAfterInsertRow,   // A hook for after insert rows
//         insertBtn: this.createCustomInsertButton,
//         addModal: this.createAddModal,
//             onDeleteRow: this.props.onDeleteRow
//     };
//
//         function showNameCustomer(cell, row) {
//             return cell.nameCustomer;
//         }
//
//         function showPhoneNumber(cell, row) {
//             return cell.phoneNumber;
//         }
//
//         function sortByPhoneNumber(a, b, order, field) {
//             if (order === 'desc') {
//                 if (a[field].phoneNumber > b[field].phoneNumber) { return -1;
//                 } else if (a[field].phoneNumber < b[field].phoneNumber) { return 1;
//                 } return 0;
//             }
//             if (a[field].phoneNumber < b[field].phoneNumber) {return -1;
//             } else if (a[field].phoneNumber > b[field].phoneNumber) { return 1;
//             } return 0;
//         }
//
//         function sortByNameCustomer(a, b, order, field) {
//             if (order === 'desc') {
//                 if (a[field].nameCustomer > b[field].nameCustomer) { return -1;
//                 } else if (a[field].nameCustomer < b[field].nameCustomer) { return 1;
//                 } return 0;
//             }
//             if (a[field].nameCustomer < b[field].nameCustomer) { return -1;
//             } else if (a[field].nameCustomer > b[field].nameCustomer) { return 1;
//             } return 0;
//         }
//
//
//
//         function operateFormatter(cell, row) {
//             console.log(row.id);
//             return (
//                 <div>
//                     <a className="lan-edit" href="#!" title="Edit">
//                         <i className="fas fa-pen" style={{"marginRight":"5px"}}></i>
//                     </a>
//                     <a className="lan-remove" onClick={
//                         deleteOrder(row)
//                         } title="Remove">
//                         <i className="fa fa-trash"></i>
//                     </a>
//                 </div>);
//         }
//
//         return (
//             <div  className="container mt-2 mb-2">
//                 <InsertButton/>
//                 <br/>
//                 <DeleteButton/>
//                 <BootstrapTable сlassName=" "
//                                 remote={ true }
//                                 data={ orders }
//                                 pagination search={ true }
//                                  options={ options } deleteRow>
//                     <TableHeaderColumn  dataField="id" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'
//                                        isKey hidden searchable={ false }>ID</TableHeaderColumn>
//                     <TableHeaderColumn dataField="status" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Статус</TableHeaderColumn>
//                     <TableHeaderColumn dataField="customer"
//                                        dataFormat={showNameCustomer} dataSort={ true }
//                                        headerAlign='center' dataAlign='center'
//                                        sortFunc = {sortByNameCustomer}>Клиент</TableHeaderColumn>
//                     <TableHeaderColumn dataField="customer"
//                                        dataFormat={showPhoneNumber} dataSort
//                                        headerAlign='center' dataAlign='center'
//                                        sortFunc={ sortByPhoneNumber }>Телефон</TableHeaderColumn>
//                     <TableHeaderColumn dataField="timeTravel" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Дата</TableHeaderColumn>
//                     <TableHeaderColumn dataField="startAddress" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Откуда</TableHeaderColumn>
//                     <TableHeaderColumn dataField="destAddress" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Куда</TableHeaderColumn>
//                     <TableHeaderColumn  dataField="classD" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Класс дракона</TableHeaderColumn>
//                     <TableHeaderColumn dataField="dragon" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Дракон</TableHeaderColumn>
//                     <TableHeaderColumn dataField="sum" dataSort={ true }
//                                        headerAlign='center' dataAlign='center'>Итого</TableHeaderColumn>
//                     <TableHeaderColumn dataFormat={operateFormatter}
//                                        headerAlign='center' data-align="center" >Action</TableHeaderColumn >
//                     {/*customEditor={ { getElement: deleteRowOrder } }*/}
//
//                 </BootstrapTable>
//
//             </div>
//         );
//     }
// }
//
// ListOrders.propTypes = {
//     deleteOrder: PropTypes.func.isRequired
// };
//
// export default connect(
//     null,
//     { deleteOrder }
// )(ListOrders);