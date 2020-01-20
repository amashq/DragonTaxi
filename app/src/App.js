import React, { Component } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AuthServise from "./service/AuthService";

import Navbar from "./common/Navbar";
import Greeting from "./common/Greeting";
import Contacts from "./components/Menu/Contacts";
import Services from "./components/Menu/Services";
import AboutTaxi from "./components/Menu/AboutTaxi";
import Footer from "./common/Footer";
import AddOrder from "./components/Order/AddOrder";
import OrderBoard from "./components/Order/OrderBoard";
import ListDragons from "./components/Dragonolog/ListDragons";
import ListNamesDragons from "./components/Dragonolog/ListNamesDragons";
import {Route, withRouter, Switch} from "react-router-dom";
import ListRoutes from "./components/Routes/ListRoutes";
import Login from "./components/Login";
import {ACCESS_TOKEN} from "./constants/constants";
import Loading from "./common/Loading";
import NotFound from "./common/NotFound";
import AllOrders from "./components/Driver/AllOrders";
import UserPage from "./components/Admin/UserPage";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            isManager: false,
            isUser: false,
            isAdmin: false,
            isDragonolog: false,
            isCashier: false,
            isDriver: false,
            message: null
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        AuthServise.getCurrentUser()
            .then(response => {
                if (response.data.role.includes("MANAGER")){
                    this.setState({ isManager: true });
                } else if (response.data.role.includes("DRAGONOLOG")){
                    this.setState({ isDragonolog: true });
                } else if (response.data.role.includes("CASHIER")){
                    this.setState({ isCashier: true });
                } else if (response.data.role.includes("ADMIN")){
                    this.setState({ isAdmin: true });
                } else if (response.data.role.includes("DRIVER")){
                    this.setState({ isDriver: true });
                }
                    this.setState({
                    currentUser: response.data.username,
                    isAuthenticated: true,
                        isLoading: false
                });
                if (this.state.isManager){
                this.props.history.push("/listOrders");
                } else if (this.state.isDragonolog){
                    this.props.history.push("/listDragons");
                } else if (this.state.isCashier){
                    this.props.history.push("/listRoutes");
                }else if (this.state.isDriver){
                    this.props.history.push("/allOrders");
                }else if (this.state.isAdmin){
                    this.props.history.push("/users");
                }

            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogin() {
        this.loadCurrentUser();
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false,
            isManager: false,
            isUser: false,
            isAdmin: false,
            isDragonolog: false,
            isCashier: false,
            isDriver: false,
        });
        this.props.history.push("/login");
    }


  render() {
      if(this.state.isLoading) {
          return <Loading />
      }
    return (
        <div className="container">
            <Navbar isAuthenticated={this.state.isAuthenticated}
                       currentUser={this.state.currentUser}
                    isManager={this.state.isManager}
                    isDragonolog={this.state.isDragonolog}
                    isCashier={this.state.isCashier}
                    isDriver={this.state.isDriver}
                    isAdmin={this.state.isAdmin}
                       onLogout={this.handleLogout} />
                       <Switch>
                           <Route exact path="/" component={Greeting}/>
                           <Route exact path="/about" component={AboutTaxi}/>
                           <Route exact path="/contacts" component={Contacts}/>
                           <Route exact path="/services" component={Services}/>
                           <Route exact path="/order" component={AddOrder}/>
                           <Route exact path="/listOrders" component={OrderBoard}/>
                           <Route exact path="/listDragons" component={ListDragons}/>
                           <Route exact path="/listNamesDragons" component={ListNamesDragons}/>
                           <Route exact path="/listRoutes" component={ListRoutes}/>
                           <Route exact path="/users" component={UserPage}/>
                           <Route path="/allOrders" render={(props) => <AllOrders currentUser={this.state.currentUser}  {...props} />}/>
                           <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
                           <Route path="/error" component={NotFound}/>
                       </Switch>
            <br/>
            <Footer />
        </div>
  );
  }
}

export default withRouter(App);
