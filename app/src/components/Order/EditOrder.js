import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ValidationSchema = Yup.object().shape({
    nameCustomer: Yup.string()
        .min(2, "Слишком короткое имя!")
        .max(100, "Слишком длинное имя!")
        .required("Введите имя"),
    phoneNumber: Yup.string().matches(/^[0-9]{1}[-]{1}[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/,
        "Телефон должен быть в формате 8-555-555-5555")
        .required("Введите телефонный номер"),
    startAddress: Yup.string()
        .required("Введите адрес отправления"),
    destAddress: Yup.string()
        .required("Введите адрес прибытия"),
    timeTravel: Yup.string().matches(/^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}[ ]{1}[0-9]{2}[:]{1}[0-9]{2}$/,
        "Время и дата должны быть в формате 01/01/2010 12:10")
        .required("Введите время и дату поездки"),
    dragon:  Yup.string()
        .required("Выберите дракона")
});

class EditOrder extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let dragons = this.props.dragons;
        let drivers = this.props.drivers;
        if (this.props.order.driver===null) {console.log(1)}

        return (
            <div>

                <Formik
                    initialValues={{
                        id: this.props.order.id,
                        status: this.props.order.status,
                        nameCustomer: this.props.order.customer.nameCustomer,
                        phoneNumber: this.props.order.customer.phoneNumber,
                        startAddress: this.props.order.startAddress,
                        destAddress: this.props.order.destAddress,
                        timeTravel: this.props.order.timeTravel,
                        classD: this.props.order.classD,
                        dragon: this.props.order.dragon,
                        driver: this.props.order.driver===null? '': this.props.order.driver.nameDriver,
                        sum: this.props.order.sum
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={(
                        values) => {
                        const Order = {
                            id: values.id,
                            status: values.status,
                            startAddress: values.startAddress,
                            destAddress: values.destAddress,
                            timeTravel: values.timeTravel,
                            classD: values.classD,
                            dragon: values.dragon,
                            sum: values.sum
                        };

                        const Customer = {
                            nameCustomer: values.nameCustomer,
                            phoneNumber: values.phoneNumber
                        };

                        const Driver ={
                            nameDriver: values.driver
                        };

                        const json = {
                            order: Order,
                            customer: Customer,
                            driver: Driver
                        };
                        this.props.handleSubmit(json);
                    }
                    }
                >

                    {({values, errors, touched, handleChange}) => (
                <Form >
                        <div className="form-group">
                            <label hidden htmlFor="inputOrderId2">Номер заказа</label>
                            <Field hidden type="text" className="form-control" id="inputOrderId2"
                                   value={values.id} name="id"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputOrderStatus2">Статус заказа</label>
                        <Field as="select"  className={"custom-select" + (errors.status && touched.status ? ' is-invalid' : '')}
                                id="inputOrderStatus2" name="status"
                                value={values.status} onChange={handleChange} >
                            <option value="Получен">Получен</option>
                            <option value="Выполнен">Выполнен</option>
                            <option value="Отменен">Отменен</option>
                        </Field>
                        </div>
                    <div className="form-group">
                        <label htmlFor="inputCustomer2">Имя клиента</label>
                        <Field type="text" className={"form-control"  + (errors.nameCustomer && touched.nameCustomer ? ' is-invalid' : '')}
                               id="inputCustomer2"
                               value={values.nameCustomer} onChange={handleChange}
                               name="nameCustomer"/>
                        <ErrorMessage name="nameCustomer" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPhone2">Телефон клиента</label>
                        <Field type="text" className={"form-control"  + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')}
                               id="inputPhone2" name="phoneNumber"
                               value={values.phoneNumber} onChange={handleChange}/>
                        <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTime2">Время и дата заказа</label>
                        <Field type="text" className={"form-control" + (errors.timeTravel && touched.timeTravel ? ' is-invalid' : '')}
                               id="inputTime2" name="timeTravel"
                               value={values.timeTravel} onChange={handleChange}/>
                        <ErrorMessage name="timeTravel" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDeparture2">Место отправления</label>
                        <Field type="text" className={"form-control" + (errors.startAddress && touched.startAddress ? ' is-invalid' : '')}
                               value={values.startAddress} onChange={handleChange}
                               id="inputDeparture2" name="startAddress"/>
                        <ErrorMessage name="startAddress" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputArrival2">Место прибытия</label>
                        <Field type="text" className={"form-control" + (errors.destAddress && touched.destAddress ? ' is-invalid' : '')}
                               id="inputArrival2" name="destAddress"
                               value={values.destAddress} onChange={handleChange} />
                        <ErrorMessage name="destAddress" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label hidden htmlFor="inputOrderClassD2">Класс дракона</label>
                        <Field readOnly type="text" className={"form-control" + (errors.classD && touched.classD ? ' is-invalid' : '')}
                               id="inputOrderClassD2" name="classD"
                               value={values.classD} onChange={handleChange} />
                        <ErrorMessage name="classD" component="div" className="invalid-feedback"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDrago2">Дракон</label>
                        <Field as="select" className={"custom-select" + (errors.dragon && touched.dragon ? ' is-invalid' : '')}
                               id="inputDrago2" name="dragon"
                                value={values.dragon}>
                            <option  key={0} value={this.props.order.dragon}>{this.props.order.dragon}</option>
                            {
                                dragons.map((dragon) =>
                                    <option  key={dragon.id} value={dragon.name}>{dragon.name}</option>
                                )
                            }
                        </Field>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDriver2">Водитель</label>
                        <Field as="select" className={"custom-select" + (errors.driver && touched.driver ? ' is-invalid' : '')}
                               id="inputDriver2" name="driver"
                               value={values.driver}>
                            <option  key={0} value={this.props.order.driver===null? '': this.props.order.driver.nameDriver}>
                                {this.props.order.driver===null? '': this.props.order.driver.nameDriver}</option>
                            {
                                drivers.map((driver) =>
                                    <option  key={driver.id} value={driver.nameDriver}>{driver.nameDriver}</option>
                                )
                            }
                        </Field>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputTotal2">Сумма заказа</label>
                        <Field type="text" className={"form-control" + (errors.sum && touched.sum ? ' is-invalid' : '')}
                               id="inputTotal2" name="sum"
                               value={values.sum} onChange={handleChange} />
                        <ErrorMessage name="sum" component="div" className="invalid-feedback"/>
                    </div>

                    <button type="submit" id="saveEditOrderButton" className="saveEdit btn btn-primary" >Сохранить изменения</button>
                    <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>

                </Form>
                    )}
                </Formik>

            </div>
        );
    }
}

export default  EditOrder;