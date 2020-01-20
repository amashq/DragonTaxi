import React, {Component} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "react-bootstrap/Button";

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Слишком короткое имя!")
        .max(100, "Слишком длинное имя!")
        .required("Введите имя"),
    classD:  Yup.string()
        .required("Выберите класс дракона")
});

class AddDragon extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Formik
                    initialValues={{
                        name: '',
                        busy: false,
                        patient: '',
                        classD: '',
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={(values) => {
                        const Dragon = {
                            name: values.name,
                            busy: values.busy,
                            patient: values.patient,
                            classDragon: values.classD
                        };

                        this.props.handleSubmit(Dragon);
                    }
                    }
                >
                    {({values, errors, touched,  setFieldValue}) => (
                        <Form>
                            <div className="container">

                                <div className="input-group">
                                    <label className="col-2 col-form-label">Класс дракона</label>
                                    <Field as="select" className={"custom-select" + (errors.classD && touched.classD ? ' is-invalid' : '')}
                                           id="inputGroupSelectClass"
                                           name="classD" >
                                        <option value = ""></option>
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

                                <div className="input-group" id="inputGroupSelectName">
                                    <label className="col-2 col-form-label">Имя дракона</label>
                                    <Field type="text"
                                           className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                                           id="formGroupExampleInput"
                                           name="name" placeholder="Землехват"/>

                                    <ErrorMessage name="name" component="div" className="invalid-feedback indent"/>
                                </div>

                                <div className="input-group">
                                    <label className="col-2 col-form-label">На лечении</label>
                                    <Field as="select" className={"custom-select" + (errors.patient && touched.patient ? ' is-invalid' : '')}
                                           id="inputGroupSelectPatient"
                                           name="patient" >
                                        <option value="true">Да</option>
                                        <option value="false">Нет</option>
                                    </Field>
                                    <ErrorMessage name="patient" component="div" className="invalid-feedback"/>
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

export default AddDragon;