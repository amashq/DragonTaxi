import React, {Component} from 'react';
import DragonDataService from "../../service/DragonDataService";
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import ModalWindow from "../ModalWindow";
import EditDragon from "../Dragonolog/EditDragon";
import ServerError from "../../common/ServerError";

class ListNamesDragons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classDragon: localStorage.getItem('classDragon'),
            dragons: [],
            message: null
        };

        this.deleteRowDragon = this.deleteRowDragon.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDragon = this.updateDragon.bind(this);
        this.listDragons = this.listDragons.bind(this);
    }

    componentDidMount() {
        DragonDataService.getNamesDragons(this.state.classDragon).then(
            response => {
                this.setState({dragons: response.data});
            } ).catch(error => {
                this.setState({ serverError: true })
        });
    }

    deleteRowDragon(row) {
        DragonDataService.deleteDragon(row)
            .then(
                response => {
                    this.setState({ message: `Дракон успешно удален` });
                    this.componentDidMount()
                }).catch(error => {
                this.setState({ serverError: true })
        })
    }

    updateDragon(id) {
        DragonDataService.getDragon(id).then(
            response => {
                this.setState({ dragon: response.data });
                this.openEditModal();
            }).catch(error => {
            this.setState({ serverError: true })
        })
    }

    listDragons() {
        this.props.history.push(`/listDragons`);
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


    handleSubmit(dragon) {
        DragonDataService.updateDragon(dragon).then(
            response => {
                this.setState({ message: `Данные дракона изменены` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            }
        ).catch(error => {
                this.setState({ serverError: true })
        })
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
                   title="Remove">
                    <i className="fa fa-trash ui"></i>
                </a>
            </div>);
    }

    render() {

        function showYesNo(cell, row) {
            if(cell === false) {
                return cell="нет"
            } else {
                return cell="да"}
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            <div className="container mt-2 mb-2">

                <InsertButton
                    btnText="Назад"
                    className="btn btn-default btn-primary addForm"
                    onClick={this.listDragons}/>

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