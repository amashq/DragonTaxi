// import React, {Component} from 'react';
// import OrderDataService from "../../service/OrderDataService";
// import Button from "react-bootstrap/Button";
//
//
//
// class EditOrder extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             id: this.props.order.id,
//             status: this.props.order.status,
//             nameCustomer: this.props.order.customer.nameCustomer,
//             phoneNumber: this.props.order.customer.phoneNumber,
//             startAddress: this.props.order.startAddress,
//             destAddress: this.props.order.destAddress,
//             timeTravel: this.props.order.timeTravel,
//             classD: this.props.order.classD,
//             dragon: this.props.order.dragon,
//             sum: this.props.order.sum
//             // ,
//             // dragons: this.props.dragons
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//
//     handleChange(event) {
//         this.setState({ [event.target.name]: event.target.value });
//     }
//
//
//     handleSubmit(event) {
//
//         event.preventDefault();
//         const Order = {
//             id: this.state.id,
//             status: this.state.status,
//             startAddress: this.state.startAddress,
//             destAddress: this.state.destAddress,
//             timeTravel: this.state.timeTravel,
//             classD: this.state.classD,
//             dragon: this.state.dragon,
//             sum: this.state.sum
//         };
//
//         const Customer = {
//             nameCustomer: this.state.nameCustomer,
//             phoneNumber: this.state.phoneNumber
//         };
//
//         const json = {
//             order: Order,
//             customer: Customer
//         };
//         console.log(json);
//         this.props.handleSubmit(json);
//     }
//
//
//     render() {
//
//         let dragons = this.props.dragons;
//
//         return (
//             <div>
//
//                 <form onSubmit={ this.props.updateOrder}>
//
//                     <div className="form-group">
//                         <label hidden htmlFor="inputOrderId2">Id заказа</label>
//                         <input hidden type="text" className="form-control" id="inputOrderId2"
//                                value={this.state.id} name="id"
//                                onChange={this.handleChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputOrderStatus2">Статус заказа</label>
//                         <select className="custom-select" id="inputOrderStatus2"
//                                 name="status"
//                                 value={this.state.status} onChange={this.handleChange}>
//                             <option value="Получен">Получен</option>
//                             <option value="Выполнен">Выполнен</option>
//                             <option value="Отменен">Отменен</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputCustomer2">Имя клиента</label>
//                         <input type="text" className="form-control" id="inputCustomer2"
//                                value={this.state.nameCustomer} name="nameCustomer"
//                                onChange={this.handleChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputPhone2">Телефон клиента</label>
//                         <input type="text" className="form-control" id="inputPhone2"
//                                value={this.state.phoneNumber} name="phoneNumber"
//                                onChange={this.handleChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputTime2">Время и дата заказа</label>
//                         <input type="text" className="form-control" id="inputTime2"
//                                value={this.state.timeTravel} name="timeTravel"
//                                onChange={this.handleChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputDeparture2">Место отправления</label>
//                         <input type="text" className="form-control" id="inputDeparture2"
//                                value={this.state.startAddress} name="startAddress"
//                                onChange={this.handleChange} required/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputArrival2">Место прибытия</label>
//                         <input type="text" className="form-control" id="inputArrival2"
//                                value={this.state.destAddress} onChange={this.handleChange}
//                                name="destAddress" required/>
//                     </div>
//                     <div className="form-group">
//                         <label hidden htmlFor="inputOrderClassD2">Класс дракона</label>
//                         <input hidden type="text" className="form-control" id="inputOrderClassD2"
//                                value={this.state.classD} onChange={this.handleChange}
//                                name="classD" required/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputDrago2">Дракон</label>
//                         <select className="form-control" id="inputDrago2"
//                                 name="dragon"
//                                 value={this.state.dragon} onChange={this.handleChange}>
//                             <option  key={0} value={this.props.order.dragon}>{this.props.order.dragon}</option>
//                             {
//                                 dragons.map((dragon) =>
//                                     <option  key={dragon.id} value={dragon.name}>{dragon.name}</option>
//                                 )
//                             }
//                         </select>
//
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="inputTotal2">Сумма заказа</label>
//                         <input type="text" className="form-control" id="inputTotal2"
//                                value={this.state.sum} onChange={this.handleChange}
//                                name="sum" required/>
//                     </div>
//
//                     <Button id="saveEditOrderButton" className="saveEdit btn btn-primary" onClick={this.handleSubmit}>Сохранить изменения</Button>
//                     <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>
//
//
//                 </form>
//
//             </div>
//
//
//         );
//     }
// }
//
// export default  EditOrder;