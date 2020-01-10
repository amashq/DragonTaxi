import React, {Component} from 'react';
import DragonDataService from "../../service/DragonDataService";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import OrderDataService from "../../service/OrderDataService";
import EditDragon from "../Dragonolog/EditDragon";

class ListNamesDragons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classDragon: localStorage.getItem('classDragon'),
            dragons: [],
            message: null
            // this.props.location.appState.classDragon
        };

        this.deleteRowDragon = this.deleteRowDragon.bind(this);
        // this.refreshDragons = this.refreshDragons.bind(this);
        // this.showDragons = this.showDragons.bind(this);
    }

    componentDidMount() {
        DragonDataService.getNamesDragons(this.state.classDragon).then(
            response => {
                this.setState({dragons: response.data});
            } )
    }

    deleteRowDragon(row) {
        DragonDataService.deleteDragon(row)
            .then(
                response => {
                    this.setState({ message: `Дракон успешно удален` });
                    this.componentDidMount()
                }
            )
    }

    updateDragon(id) {
        DragonDataService.getDragon(id).then(
            response => {
                this.setState({ dragon: response.data });
                this.openEditModal();
            }
        );
    }

    state = {
        isOpen: false,
        title: '',
        children: ''
    };

    openEditModal = () => {
        this.setState({ title: 'Изменение данных дракона' });
        this.setState({ children: <EditDragon dragon={this.state.dragon}
                                             handleCancel={this.handleCancel}
                                             handleSubmit={this.handleSubmit}/> });
        this.setState({ isOpen: true });
    };

    handleSubmit(json) {
        console.log(json);
        OrderDataService.updateDragon(json).then(
            response => {
                this.setState({ message: `Данные дракона изменены` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            }
        );
    };

    handleCancel = () => {
        this.setState({ isOpen: false });
    };

    operateFormatter(cell, row) {
        return (
            <div align="center">
                <a className="lan-edit"
                   onClick={() => this.updateDragon(row.id) }
                   title="Edit">
                    <i className="fas fa-pen ui" style={{"marginRight":"5px"}}></i>
                </a>
                <a className="lan-remove"
                   onClick={() => this.deleteRowDragon(row) }
                    // href=" "
                   title="Remove">
                    <i className="fa fa-trash ui"></i>
                </a>
            </div>);
    }

    render() {

        function showYesNo(cell, row) {
            if(cell === false) {
                // row.busy = "нет";
                return cell="нет"
            } else {
                // row.busy = "да";
                return cell="да"}
        }

        return (
            <div className="container mt-2 mb-2">

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <BootstrapTable data={ this.state.dragons }
                                pagination search multiColumnSearch>
                    <TableHeaderColumn  dataField="id" dataSort={ true }
                                        headerAlign='center' dataAlign='center'
                                        isKey hidden searchable={ false }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Имя дракона</TableHeaderColumn>
                    <TableHeaderColumn dataField="busy" dataSort={ true } dataFormat={showYesNo}
                                       headerAlign='center' dataAlign='center'>В заказе</TableHeaderColumn>
                    <TableHeaderColumn dataField="patient" dataSort={ true } dataFormat={showYesNo}
                                       headerAlign='center' dataAlign='center'>На лечении</TableHeaderColumn>
                    <TableHeaderColumn dataField="classDragon" dataSort={ true }
                                       headerAlign='center' dataAlign='center'>Класс дракона</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={(cell, row) => this.operateFormatter(cell, row)}
                                       headerAlign='center' data-align="center" >Действия</TableHeaderColumn >
                </BootstrapTable>


                <ModalWindow
                    title={this.state.title}
                    isOpen={this.state.isOpen}
                    onCancel={this.handleCancel}
                    children={this.state.children}
                >
                </ModalWindow>


            </div>
        );
    }
}

export default ListNamesDragons;