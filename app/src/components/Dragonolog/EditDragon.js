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
            classDragon: this.props.dragon.classDragon
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {

        event.preventDefault();
        const Dragon = {
            id: this.props.dragon.id,
            name: this.props.dragon.name,
            busy: '',
            patient: '',
            classDragon: this.props.dragon.classDragon
        };

        this.props.handleSubmit(Dragon);
    }

    componentDidMount() {
        if (this.props.dragon.busy === true) {
            this.setState( {busy: 'да' } );
            this.setState( {patient: 'да' } );
        } else {
            this.setState( {busy: 'нет' } );
            this.setState( {patient: 'нет' } );
        }
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
                        <select className="custom-select" id="inputDragonBusy"
                                name="busy" value={this.state.busy} onChange={this.handleChange}
                                required>
                            <option value="Да">Да</option>
                            <option value="Нет">Нет</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDragonPatient">На лечении</label>
                        <select className="custom-select" id="inputDragonPatient"
                                name="patient"  value={this.state.patient} onChange={this.handleChange}
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