import React, {Component} from 'react';

class Contacts extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">

                    <div className="contact-us ptb-95">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-6">
                            <div className="small-title mb-30">
                                <h2>Контактная информация</h2>
                                <p>Организация: «DragonTaxi»</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="contact-information mb-30">
                                        <h4>Наш адрес</h4>
                                        <p>остров Олух, Адская Впадина, д. 21</p>
                                        <p>Пн-Пт, Сб, Вскр круглосуточно</p>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="contact-information contact-mrg mb-30">
                                        <h4>Телефон</h4>
                                        <p>
                                            <a href="tel:8812535-76-25">+7 (999) 208-01-66</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="contact-information contact-mrg mb-30">
                                        <h4>Почта</h4>
                                        <p>
                                            <a href="mailto:trzakaz@bk.ru">DragonTaxi@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
        );
    }
}

export default Contacts;