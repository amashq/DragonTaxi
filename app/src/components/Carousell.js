import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Carousell extends Component {
    render() {
        return (
                <Carousel>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/5dragon.png'} className="d-block" alt="Разящие драконы"/>
                        <Carousel.Caption>
                            <h5>Разящие драконы</h5>
                            <p>Повышенный интеллект, невероятная скорость, уникальный вид атаки и мастерство
                                        маскировки</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/7dragon.png'} className="d-block" alt="Кочегары"/>
                        <Carousel.Caption>
                            <h5>Кочегары</h5>
                            <p>Сильная огневая мощь</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/3dragon.png'} className="d-block" alt="Камнееды"/>
                        <Carousel.Caption>
                            <h5>Камнееды</h5>
                            <p>Способны переваривать камни</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/4dragon.png'} className="d-block" alt="Ищейки"/>
                        <Carousel.Caption>
                            <h5>Ищейки</h5>
                            <p>Превосходное обоняние</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/2dragon.png'} className="d-block" alt="Когтевики"/>
                        <Carousel.Caption>
                            <h5>Когтевики</h5>
                            <p>Драконы с развитыми шипами и когтями</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/1dragon.png'} className="d-block" alt="Водные"/>
                        <Carousel.Caption>
                            <h5>Водные</h5>
                            <p>Драконы, живущие в воде</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={process.env.PUBLIC_URL + '/8dragon.png'} className="d-block" alt="Загадочные"/>
                        <Carousel.Caption>
                            <h5>Загадочные</h5>
                            <p>Виды драконов, информации о которых катастрофически мало. Данные виды не подходят
                                        ни к одному из классов</p>
                        </Carousel.Caption>
                    </Carousel.Item>
        </Carousel>
        );
    }
}

export default Carousell;