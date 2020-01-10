import React, {Component} from 'react';

class AboutTaxi extends Component {
    render() {
        return (
            <div>
                <main className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Dragon taxi</h1>
                        <p className="lead">Первое драконье такси на острове Олух, гарантирующее высокий уровень
                            обслуживания, комфорт и безопасность в пути.</p>
                        <br/><p className="lead">Основные качества, отличающие наше такси:</p>
                            <ul className="lead">
                                <li>Высокий уровень сервиса;</li>
                                <li>Порядочность водителя;</li>
                                <li>Индивидуальный подход;</li>
                                <li>Широкий ассортимент услуг.</li>
                            </ul>
                            <br/><p className="lead">Ценности компании:</p>
                                <ul className="lead">
                                    <li>Качественное и профессиональное выполнение обязательств перед нашими
                                        клиентами;
                                    </li>
                                    <li>Уважение, взаимовыручка, сплоченность коллектива компании;</li>
                                    <li>Открытость, честность и работа на результат.</li>
                                </ul>
                    </div>
                </main>
            </div>
        );
    }
}

export default AboutTaxi;