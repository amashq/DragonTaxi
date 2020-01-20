import React, {Component} from 'react';
import Button from "react-bootstrap/Button";


class EditDragon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.dragon.id,
            name: this.props.dragon.name,
            busy: this.props.dragon.busy,
            patient: this.props.dragon.patient,
            classDragon: this.props.dragon.classDragon,
            busy2: this.props.dragon.busy,
            patient2: this.props.dragon.patient,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.dragon.busy === true) {
            this.setState( {busy2: 'Да' } );
        } else {
            this.setState( {busy2: 'Нет' } );
        }
        if (this.props.dragon.patient === true) {
            this.setState( {patient2: 'Да' } );
        } else {
            this.setState( {patient2: 'Нет' } );
        }
    }

    handleChange(event) {

        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value === 'Да' && event.target.name === "patient2") {
            this.setState( {patient: true } );
        } else {
            this.setState( {patient: false } );
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const Dragon = {
            id: this.state.id,
            name: this.state.name,
            busy: this.state.busy,
            patient: this.state.patient,
            classDragon: this.state.classDragon
        };
        this.props.handleSubmit(Dragon);
    }


    render() {

        return (
            <div>

                <form onSubmit={ this.props.updateDragon}>

                    <div className="form-group">
                        <label hidden htmlFor="inputDragonId">Id дракона</label>
                        <input hidden type="text" className="form-control" id="inputDragonId"
                               value={this.state.id} name="id"
                               onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDragonName">Имя дракона</label>
                        <input type="text" className="form-control" id="inputDragonName"
                               value={this.state.name} name="name"
                               onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label hidden htmlFor="inputDragonClassD">Класс дракона</label>
                        <input hidden type="text" className="form-control" id="inputDragonClassD"
                               value={this.state.classDragon} name="classDragon"
                               onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDragonBusy">В заказе</label>
                        <input type="text" className="form-control" id="inputDragonBusy"
                               value={this.state.busy2} name="busy2" readOnly required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDragonPatient">На лечении</label>
                        <select className="custom-select" id="inputDragonPatient"
                                name="patient2"  value={this.state.patient2} onChange={this.handleChange}
                                required>
                            <option value="Да">Да</option>
                            <option value="Нет">Нет</option>
                        </select>
                    </div>

                    <Button id="saveDragonButton" className="saveEdit btn btn-primary" onClick={this.handleSubmit}>Сохранить изменения</Button>
                    <Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleCancel}>Закрыть</Button>

                </form>
            </div>
        );
    }
}

export default  EditDragon;