import React, {Component} from 'react';
import AuthService from "../service/AuthService";
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants/constants';
import { Formik, Form, Field, ErrorMessage, FastField} from 'formik';
import * as Yup from "yup";
import NotFound from "../common/NotFound";
import ServerError from "../common/ServerError";
import AuthError from "../common/AuthError";

const ValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "Слишком короткое имя!")
        .max(20, "Слишком длинное имя!")
        .required("Введите имя"),
    password: Yup.string()
        .min(1, "Слишком короткий пароль!")
        .max(20, "Слишком длинный пароль!")
        .required("Введите пароль")
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            notFound: '',
            serverError: '',
            authError: '',
            isLoading: false
        }
    }

    render() {

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        if(this.state.authError) {
            return <AuthError />;
        }


        return (
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={(values) => {

                        this.setState({
                            isLoading: true
                        });
                        const json = {
                            username: values.username,
                            password: values.password
                        };
                        console.log(json);
                        AuthService.login(json)
                            .then(
                                response => {
                                    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                                    this.props.onLogin();
                                    this.setState({isLoading: false});
                                })
                            .catch(error => {
                                console.log(error);
                                this.setState({isLoading: false});
                                this.setState({authError: true})
                            });
                    }
                    }
                >
                    {({values, errors, touched,  setFieldValue, handleChange}) => (
                <Form >
                    <div className="container center-block">
                        <div className="col-sm-5" id="FormaLoginPass">
                            <div className="login">Вход</div>
                            <Field type="text" name="username" value=""
                                   className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
                                   placeholder="Имя" value={values.username} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback"/>

                            <br/>
                        <Field type="password" name="password"
                               className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                               placeholder="Пароль" value={values.password} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>

                            <br/>
            <button id="buttoncomein2" name="singlebutton" className="btn btn-primary"
                    type="submit" >ВОЙТИ</button>

        </div>
    </div>
    </Form>
                        )}
                </Formik>
            </div>
        );
    }
}

export default Login