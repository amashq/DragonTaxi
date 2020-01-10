import React, {Component} from 'react';
import DragonDataService  from "../../service/DragonDataService";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import Button from "react-bootstrap/Button";
import ListNamesDragons from "./ListNamesDragons";

class ListDragons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dragons: []
        };
        this.refreshDragons = this.refreshDragons.bind(this);
        this.showDragons = this.showDragons.bind(this);
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

        console.log(classDragon);
                localStorage.setItem('classDragon', classDragon);
                this.props.history.push('/listNamesDragons');
}

    operateFormatter(cell, row) {
        console.log(row.classDragon);

        console.log(row.classD);
        return (
            <div>
                <Button className="btn btn-primary bb" onClick={() => this.showDragons(row.classDragon)}>Показать</Button>
            </div>);
    }


    render() {
        return (
            <div className="container mt-5 mb-5 mx-auto width-table">

                <BootstrapTable data={ this.state.dragons }>
                    <TableHeaderColumn  dataField="classDragon" dataSort={ true }  isKey={true} headerAlign='center'
                                        dataAlign='center'>Класс дракона</TableHeaderColumn>
                    <TableHeaderColumn  dataField="countDragons" dataSort={ true } headerAlign='center'
                                        dataAlign='center'>Всего</TableHeaderColumn>
                    <TableHeaderColumn  dataFormat={(cell, row) => this.operateFormatter(cell, row)}
                                        headerAlign='center' dataAlign='center'
                                        searchable={ false }> Список драконов</TableHeaderColumn>

                </BootstrapTable>

            </div>
        );
    }
}

export default ListDragons;