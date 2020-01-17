import React, {Component} from 'react';
import Button from "react-bootstrap/Button";

class DetailOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.order.id,
            status: this.props.order.status,
            nameCustomer: this.props.order.customer.nameCustomer,
            phoneNumber: this.props.order.customer.phoneNumber,
            startAddress: this.props.order.startAddress,
            destAddress: this.props.order.destAddress,
            timeTravel: this.props.order.timeTravel,
            classD: this.props.order.classD,
            dragon: this.props.order.dragon,
            sum: this.props.order.sum
        };
    }

    render() {
        return (
            <div>

                <form>
                    <div className="form-group">
                        <label  htmlFor="inputOrderId2">Заказ №</label>
                        <input type="text" className="form-control" id="inputOrderId2"
                               value={this.state.id} name="id" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputOrderStatus2">Статус заказа</label>
                        <input type="text" className="form-control" id="inputOrderStatus2"
                               value={this.state.status} name="nameCustomer" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCustomer2">Имя клиента</label>
                        <input type="text" className="form-control" id="inputCustomer2"
                               value={this.state.nameCustomer} name="nameCustomer" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPhone2">Телефон клиента</label>
                        <input type="text" className="form-control" id="inputPhone2"
                               value={this.state.phoneNumber} name="phoneNumber" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTime2">Время и дата заказа</label>
                        <input type="text" className="form-control" id="inputTime2"
                               value={this.state.timeTravel} name="timeTravel" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDeparture2">Место отправления</label>
                        <input type="text" className="form-control" id="inputDeparture2"
                               value={this.state.startAddress} name="startAddress" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputArrival2">Место прибытия</label>
                        <input type="text" className="form-control" id="inputArrival2"
                               value={this.state.destAddress} name="destAddress" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputOrderClassD2">Класс дракона</label>
                        <input type="text" className="form-control" id="inputOrderClassD2"
                               value={this.state.classD} name="classD" readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDrago2">Дракон</label>
                        <input type="text" className="form-control" id="inputDrago2"
                               value={this.state.classD} name="classD" readOnly/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTotal2">Сумма заказа</label>
                        <input type="text" className="form-control" id="inputTotal2"
                               value={this.state.sum} name="sum" readOnly/>
                    </div>

                    <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>
                </form>

            </div>
        );
    }
}

export default DetailOrder;