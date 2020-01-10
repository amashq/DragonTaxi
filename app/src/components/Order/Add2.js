// import React, {Component} from 'react';
// import Carousell from '../Carousell';
// import DatePicker from 'react-datepicker';
// import { useState } from 'react';
// // import Button from "react-bootstrap/Button";
// // import PropTypes from "prop-types";
// // import {connect} from "react-redux";
// // import {addOrder} from "../../actions/orderActions";
// import { Formik, Form, Field, ErrorMessage, withFormik } from 'formik';
// import * as Yup from "yup";
//
// import 'react-datepicker/dist/react-datepicker.css';
// import OrderDataService from "../../service/OrderDataService";
// import ModalWindow from "../ModalWindow";
//
// class AddOrder extends Component {
//
//     constructor(props) {
//         let date = new Date();
//         let dateNew = date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
//             + "/" + date.getFullYear() + " " + date.getHours() +  ":" + ((date.getMinutes() === 0) ? (date.getMinutes() + '0') : date.getMinutes());
//
//         super(props);
//         this.state = {
//             nameCustomer: '',
//             phoneNumber: '',
//             startAddress: '',
//             destAddress: '',
//             timeTravel: dateNew,
//             classD: '',
//             startDate:  new Date()
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         // this.validate = this.validate.bind(this);
//     }
//
//
//
//     handleChange(event) {
//         this.setState({ [event.target.name]: event.target.value });
//         console.log(this.state.timeTravel);
//     }
//
//     handleChangeDate = date => {
//         var dateNew = date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
//             + "/" + date.getFullYear() + " " + date.getHours() +  ":" + ((date.getMinutes() === 0) ? (date.getMinutes() + '0') : date.getMinutes());
//         this.setState({
//             startDate: date,
//             timeTravel: dateNew
//         });
//         console.log(this.state.startDate);
//         console.log(this.state.timeTravel);
//     };
//
//     handleSubmit(event) {
//         event.preventDefault();
//         const newOrder = {
//             startAddress: this.state.startAddress,
//             destAddress: this.state.destAddress,
//             timeTravel: this.state.timeTravel,
//             classD: this.state.classD
//         };
//
//         const newCustomer = {
//             nameCustomer: this.state.nameCustomer,
//             phoneNumber: this.state.phoneNumber
//         };
//
//         const json = {
//             order: newOrder,
//             customer: newCustomer
//         };
//         console.log(json);
//         OrderDataService.addOrder(json)
//             .then(this.openModal).catch();
//     }
//
//
//
//     state = {
//         isOpen: false,
//     };
//
//     openModal
//         = () => {
//         this.setState({ isOpen: true });
//     };
//
//     handleSubmit2 = () => {
//         console.log('Submit function!');
//         this.setState({ isOpen: false });
//     };
//
//     handleCancel = () => {
//         console.log('Cancel function!');
//         this.setState({ isOpen: false });
//     };
//
//
//     render() {
//         // const { errors } = this.state;
//
//         return (
//             <div>
//
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="container">
//
//                         <div className="input-group ">
//                             <div className="input-group" id="inputGroupSelectName">
//                                 <label className="col-2 col-form-label">Имя</label>
//                                 <input type="text" value={this.state.value}
//                                        onChange={this.handleChange} className="form-control"
//                                     //     className ={classnames("form-control", {
//                                     //     "is-invalid": errors.nameCustomer
//                                     // })}
//                                        id="formGroupExampleInput1" required
//                                        name="nameCustomer" placeholder="Иван Иванов" />
//                                 {/*{errors.nameCustomer && (*/}
//                                 {/*    <div className="invalid-feedback">{errors.nameCustomer}</div>*/}
//                                 {/*)}*/}
//                             </div>
//                         </div>
//
//                         {/*<ErrorMessage name="phoneNumber" component="div"*/}
//                         {/*              className="alert alert-warning" />*/}
//                         <div className="input-group" id="inputGroupSelectPhone">
//                             <label className="col-2 col-form-label">Телефон</label>
//                             <input type="tel" className="form-control"
//                                    value={this.state.value} onChange={this.handleChange}
//                                    id="formGroupExampleInput2" required
//                                    name="phoneNumber" placeholder="8-555-555-5555"/>
//                         </div>
//                         {/*</div>*/}
//
//                         <div className="input-group">
//                             <select className="custom-select" id="inputGroupSelectFrom"
//                                     name="startAddress" defaultValue = " "
//                                     value={this.state.value} onChange={this.handleChange}>
//                                 <option value=" " disabled={true} >Откуда</option>
//                                 <option value="Амбар">Амбар</option>
//                                 <option value="Главный амбар">Главный амбар</option>
//                                 <option value="Визжащие леса">Визжащие леса</option>
//                                 <option value="Песня смерти">Песня смерти</option>
//                                 <option value="Потерянная бездна">Потерянная бездна</option>
//                                 <option value="Мельница">Мельница</option>
//                             </select>
//                         </div>
//                         <div className="input-group">
//                             <select className="custom-select" id="inputGroupSelectWhere"
//                                     defaultValue = " "
//                                     value={this.state.value} onChange={this.handleChange}
//                                     name="destAddress" required>
//                                 <option value=" " disabled={true}>Куда</option>
//                                 <option value="1">Главный амбар</option>
//                                 <option value="2">Амбар</option>
//                                 <option value="3">Песня смерти</option>
//                                 <option value="4">Потерянная бездна</option>
//                                 <option value="5">Визжащие леса</option>
//                                 <option value="6">Озеро Ларсона</option>
//                             </select>
//
//                         </div>
//
//
//
//                         <div className='input-group date' >
//                             <label className="col-2 col-form-label">Дата поездки</label>
//                             <DatePicker className="form-control"
//                                         selected={this.state.startDate}
//                                         showTimeInput
//                                         timeInputLabel="Time:"
//                                         dateFormat="dd/MM/yyyy hh:mm aa"
//                                         onChange={ this.handleChangeDate }
//                                         minDate={this.state.startDate}
//                                 // onSelect = { this.handleSelect }
//                                 // onChange={date => this.setStartDate(date)}
//                             />
//                         </div>
//
//
//
//                         <div className="input-group">
//                             <select className="custom-select" id="inputGroupSelectClass"
//                                     defaultValue=" "
//                                     value={this.state.value} onChange={this.handleChange}
//                                     name="classD" required>
//                                 <option value = " " disabled>Выберите класс дракона из списка</option>
//                                 <option value="Разящие">Разящие</option>
//                                 <option value="Кочегары">Кочегары</option>
//                                 <option value="Камнееды">Камнееды</option>
//                                 <option value="Ищейки">Ищейки</option>
//                                 <option value="Когтевики">Когтевики</option>
//                                 <option value="Водные">Водные</option>
//                                 <option value="Загадочные">Загадочные</option>
//                             </select>
//                         </div>
//                     </div>
//
//                     <div>
//                         <Carousell />
//                     </div>
//
//
//                     <div className="container">
//                         <div className="input-group">
//                             <input type="submit" id="button_order" style={{width: '100%'}} name="singlebutton"
//                                    className="btn btn-primary" value="ЗАКАЗАТЬ"/>
//                         </div>
//                     </div>
//
//                 </form>
//                 {/*    }*/}
//                 {/*</Formik>*/}
//                 <ModalWindow
//                     title=""
//                     isOpen={this.state.isOpen}
//                     onCancel={this.handleCancel}
//                     onSubmit={this.handleSubmit2}
//                 >
//                     <p align="center">Заказ получен!<br/>
//                         Менеджер свяжется с вами в ближайшее время.</p>
//                 </ModalWindow>
//             </div>
//
//
//         );
//     }
// }
//
// export default  AddOrder;
