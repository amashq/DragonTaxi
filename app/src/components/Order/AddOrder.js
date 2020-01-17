import React, {Component} from 'react';
import Carousell from './Carousell';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage, FastField} from 'formik';
import * as Yup from "yup";

import 'react-datepicker/dist/react-datepicker.css';
import OrderDataService from "../../service/OrderDataService";
import ModalWindow from "../ModalWindow";
import RouteDataService from "../../service/RouteDataService";


const ValidationSchema = Yup.object().shape({
    nameCustomer: Yup.string()
        .min(2, "Слишком короткое имя!")
        .max(100, "Слишком длинное имя!")
        .required("Введите имя"),
    phoneNumber: Yup.string().matches(/^[0-9]{1}[-]{1}[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/,
        "Телефон должен быть в формате 8-555-555-5555")
        .required("Введите телефонный номер"),
    startAddress: Yup.string()
        .required("Выберите адрес отправления"),
    destAddress: Yup.string()
        .required("Выберите адрес прибытия"),
    classD:  Yup.string()
        .required("Выберите класс дракона")
});

class AddOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startAddress: [],
            start: '',
            destAddress:  [],
            dest: ''
        };

        this.handleChangeStart = this.handleChangeStart.bind(this);
    }

    componentDidMount() {
        RouteDataService.getStartAddresses().then(
        response => {
            console.log(response.data);
            this.setState({ startAddress: response.data });
        } )
    }

    handleChangeDate = date => {
        return  date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
            + "/" + date.getFullYear() + " " + date.getHours() + ":" + ((date.getMinutes() === 0) ? (date.getMinutes() + '0') : date.getMinutes());
    };

    state = {
        isOpen: false,
    };

    openModal = () => {
        this.setState({isOpen: true});
    };

    handleSubmit2 = () => {
        this.setState({isOpen: false});
    };

    handleCancel = () => {
        this.setState({isOpen: false});
    };

    handleChangeStart(val) {
        RouteDataService.getDestAddresses(val).then(
            response => {
                this.setState({ destAddress: response.data });
            } )
    }

    render() {

        let addresses = this.state.startAddress;
        let destAddresses = this.state.destAddress;

        return (
            <div>
                <Formik
                    initialValues={{
                        nameCustomer: '',
                        phoneNumber: '',
                        startAddress: '',
                        destAddress: '',
                        timeTravel: new Date(),
                        classD: '',
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={(values) => {
                        const newOrder = {
                            startAddress: values.startAddress,
                            destAddress: values.destAddress,
                            timeTravel: this.handleChangeDate(values.timeTravel),
                            classD: values.classD
                        };

                        const newCustomer = {
                            nameCustomer: values.nameCustomer,
                            phoneNumber: values.phoneNumber
                        };

                        const json = {
                            order: newOrder,
                            customer: newCustomer
                        };
                        console.log(json);
                        OrderDataService.addOrder(json)
                            .then(this.openModal)
                    }
                    }
                >
                    {({values, errors, touched,  setFieldValue, handleChange}) => (
                    <Form>
                        <div className="container">

                                <div className="input-group" id="inputGroupSelectName">
                                    <label className="col-2 col-form-label">Имя</label>
                                    <Field type="text"
                                           className={'form-control' + (errors.nameCustomer && touched.nameCustomer ? ' is-invalid' : '')}
                                           id="formGroupExampleInput1"
                                           name="nameCustomer" placeholder="Иван Иванов"/>

                                    <ErrorMessage name="nameCustomer" component="div" className="invalid-feedback indent"/>
                                </div>

                                <div className="input-group" id="inputGroupSelectPhone">
                                    <label className="col-2 col-form-label">Телефон</label>
                                    <Field type="tel" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')}
                                           id="formGroupExampleInput2"
                                           name="phoneNumber" placeholder="8-555-555-5555"/>
                                    <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback indent"/>
                                </div>

                            <div className="input-group">
                                <label  className="col-2 col-form-label" htmlFor="inputStart">Откуда</label>
                                <Field as="select" className={"custom-select" + (errors.startAddress && touched.startAddress ? ' is-invalid' : '')}
                                       id="inputStart" name="startAddress"
                                       value={values.startAddress}
                                       handleChange={handleChange}
                                       onChange={(val) => {
                                           this.handleChangeStart(val.target.value) ;
                                           setFieldValue("startAddress", val.target.value);
                                       }} >
                                    <option  key={0} value={''}></option>
                                    {
                                        addresses.map((startAddress) =>
                                            <option  key={startAddress} value={startAddress}>{startAddress}</option>
                                        )
                                    }
                                </Field>
                                <ErrorMessage name="startAddress" component="div" className="invalid-feedback indent"/>
                            </div>

                            <div className="input-group">
                                <label  className="col-2 col-form-label" htmlFor="inputDest">Куда</label>
                                <Field as="select" className={"custom-select" + (errors.destAddress && touched.destAddress ? ' is-invalid' : '')}
                                       id="inputDest" name="destAddress"
                                       value={values.destAddress } >
                                    <option  key={0} value={''}></option>
                                    {
                                        destAddresses.map((destAddress) =>
                                        <option  key={destAddress} value={destAddress}>{destAddress}</option>
                                    )
                                }
                                </Field>
                                <ErrorMessage name="destAddress" component="div" className="invalid-feedback indent"/>
                            </div>
                                    <div className='input-group date' >
                                        <label className="col-2 col-form-label">Дата поездки</label>
                                        <DatePicker className="form-control"
                                                    selected={(values.timeTravel)}
                                                    showTimeInput
                                                    timeInputLabel="Time:"
                                                    dateFormat="dd/MM/yyyy hh:mm aa"
                                                    onChange={val => {
                                                        setFieldValue("timeTravel", val);}}
                                                    minDate={new Date()}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label className="col-2 col-form-label">Класс дракона</label>
                                        <Field as="select" className={"custom-select" + (errors.classD && touched.classD ? ' is-invalid' : '')}
                                            id="inputGroupSelectClass"
                                                name="classD" >
                                            <option value = " " ></option>
                                            <option value="Разящие">Разящие</option>
                                            <option value="Кочегары">Кочегары</option>
                                            <option value="Камнееды">Камнееды</option>
                                            <option value="Ищейки">Ищейки</option>
                                            <option value="Когтевики">Когтевики</option>
                                            <option value="Водные">Водные</option>
                                            <option value="Загадочные">Загадочные</option>
                                        </Field>
                                        <ErrorMessage name="classD" component="div" className="invalid-feedback indent"/>
                                    </div>

                                <div>
                                    <Carousell />
                                </div>


                                <div className="container">
                                    <div className="input-group">
                                        <button type="submit" id="button_order" style={{width: '100%'}} name="singlebutton"
                                                className="btn btn-primary mr-2">ЗАКАЗАТЬ</button>
                                    </div>
                                </div>
                        </div>

                    </Form>
                )}
                </Formik>

                <ModalWindow
                    title=""
                    isOpen={this.state.isOpen}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit2}
                >
                    <p align="center">Заказ получен!<br/>
                        Менеджер свяжется с вами в ближайшее время.</p>
                </ModalWindow>
            </div>
        );
    }
}

export default AddOrder;
