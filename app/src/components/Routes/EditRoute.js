import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
    pointOfDeparture: Yup.string()
        .min(2, "Слишком короткое название!")
        .max(100, "Слишком длинное название!")
        .required("Введите место отправления"),
    pointOfArrival:  Yup.string()
        .min(2, "Слишком короткое название!")
        .max(100, "Слишком длинное название!")
        .required("Введите место прибытия"),
    cost: Yup.number()
    // matches(/^[0-9]{1-255}$/,
    //     "Ввод должен содержать только цифры")
        .required("Введите стоимость"),
});

class EditRoute extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Formik
                    initialValues={{
                        id: this.props.route.id,
                        pointOfDeparture: this.props.route.pointOfDeparture,
                        pointOfArrival: this.props.route.pointOfArrival,
                        cost: this.props.route.cost,
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={(values) => {
                        const Route = {
                            id: values.id,
                            pointOfDeparture: values.pointOfDeparture,
                            pointOfArrival: values.pointOfArrival,
                            cost: values.cost
                        };
                        // console.log(Route);
                        this.props.handleSubmit(Route);
                    }
                    }
                >
                    {({ values, errors, touched, handleChange}) => (
                        <Form>
                            <div className="container">

                                <div className="form-group">
                                    <label hidden htmlFor="inputOrderId2">Id маршрута</label>
                                    <Field hidden type="text" className="form-control" id="inputRouteId2"
                                           value={values.id} name="id"/>
                                </div>
                                <div className="input-group" id="inputGroupSelectName">
                                    <label className="col-2 col-form-label">Откуда</label>
                                    <Field type="text"
                                           className={'form-control' + (errors.pointOfDeparture && touched.pointOfDeparture ? ' is-invalid' : '')}
                                           value={values.pointOfDeparture} id="formGroupExampleInput"
                                           name="pointOfDeparture" placeholder=""/>

                                    <ErrorMessage name="pointOfDeparture" component="div" className="invalid-feedback indent"/>
                                </div>
                                <div className="input-group" id="inputGroupSelectName2">
                                    <label className="col-2 col-form-label">Куда</label>
                                    <Field type="text"
                                           className={'form-control' + (errors.pointOfArrival && touched.pointOfArrival ? ' is-invalid' : '')}
                                           value={values.pointOfArrival} id="formGroupExampleInput2"
                                           name="pointOfArrival" placeholder=""/>

                                    <ErrorMessage name="pointOfArrival" component="div" className="invalid-feedback indent"/>
                                </div>
                                <div className="input-group" id="inputGroupSelectName3">
                                    <label className="col-2 col-form-label">Стоимость</label>
                                    <Field type="text" onChange={handleChange}
                                           className={'form-control' + (errors.cost && touched.cost ? ' is-invalid' : '')}
                                           value={values.cost} id="formGroupExampleInput3"
                                           name="cost" placeholder=""/>

                                    <ErrorMessage name="cost" component="div" className="invalid-feedback indent"/>
                                </div>



                                <div className="button-place">
                                    <button type="submit" id="saveEditOrderButton" className="saveEdit btn btn-primary" >Добавить</button>
                                    <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>


            </div>
        );
    }
}

export default EditRoute;