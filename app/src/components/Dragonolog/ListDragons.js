import React, {Component} from 'react';
import DragonDataService  from "../../service/DragonDataService";
import {BootstrapTable, InsertButton, TableHeaderColumn} from "react-bootstrap-table";
import Button from "react-bootstrap/Button";
import ModalWindow from "../ModalWindow";
import AddDragon from "./AddDragon";

class ListDragons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // dragons: [],
            message: null
        };
        this.refreshDragons = this.refreshDragons.bind(this);
        this.showDragons = this.showDragons.bind(this);
        this.addDragon = this.addDragon.bind(this);
        this.handleAddDragon = this.handleAddDragon.bind(this);
    }

    componentDidMount() {
        this.refreshDragons();
    }

    refreshDragons() {
        DragonDataService.getCountDragons()
            .then(
                response => {
                    console.log(response.data);
                    this.setState({ dragons: response.data })
                }
            );
    }

    showDragons(classDragon){
                localStorage.setItem('classDragon', classDragon);
                this.props.history.push('/listNamesDragons');
    }

    addDragon() {
        this.openAddModal();
    }

    handleAddDragon(dragon){
        DragonDataService.addDragon(dragon)
            .then(response => {

                console.log(response.data);
                this.setState({ message: `Дракон добавлен` });
                this.componentDidMount();
                this.setState({ isOpen: false });
            })
    }

    state = {
        isOpen: false,
        title: '',
        children: ''
    };

    openAddModal = () => {
        this.setState({ title: 'Добавление дракона' });
        this.setState({ children: <AddDragon handleCancel={this.handleCancel}
                                             handleSubmit={this.handleAddDragon}/> });
        this.setState({ isOpen: true });
    };


    handleCancel = () => {
        this.setState({ isOpen: false });
    };

    operateFormatter(cell, row) {
        return (
            <div>
                <Button className="btn btn-primary bb" onClick={() => this.showDragons(row.classDragon)}>Показать</Button>
            </div>);
    }


    render() {
        return (
            <div className="container mt-2 mb-2">

                <InsertButton
                    btnText="Добавить дракона"
                    className="btn btn-default btn-primary addForm"
                    onClick={this.addDragon}/>

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <BootstrapTable data={ this.state.dragons } search>
                    <TableHeaderColumn  dataField="classDragon" dataSort={ true }  isKey={true} headerAlign='center'
                                        dataAlign='center'>Класс дракона</TableHeaderColumn>
                    <TableHeaderColumn  dataField="countDragons" dataSort={ true } headerAlign='center'
                                        dataAlign='center'>Всего</TableHeaderColumn>
                    <TableHeaderColumn  dataFormat={(cell, row) => this.operateFormatter(cell, row)}
                                        headerAlign='center' dataAlign='center'
                                        searchable={ false }> Список драконов</TableHeaderColumn>
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

export default ListDragons;