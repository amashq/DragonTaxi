import React, { Component } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from "./components/Navbar";
import Greeting from "./components/Greeting";
import Contacts from "./components/Menu/Contacts";
import Services from "./components/Menu/Services";
import AboutTaxi from "./components/Menu/AboutTaxi";
import Footer from "./components/Footer";
import AddOrder from "./components/Order/AddOrder";
import EditOrder from "./components/Order/EditOrder";
import OrderBoard from "./components/Order/OrderBoard";
import ListDragons from "./components/Dragonolog/ListDragons";
import ListNamesDragons from "./components/Dragonolog/ListNamesDragons";
import {BrowserRouter as Router, Route} from "react-router-dom";



class App extends Component {
  render() {
    return (
        <Router>

          <Navbar />
          <Route exact path="/" component={Greeting}/>
          <Route exact path="/about" component={AboutTaxi}/>
          <Route exact path="/contacts" component={Contacts}/>
          <Route exact path="/services" component={Services}/>
          <Route exact path="/order" component={AddOrder}/>
          <Route exact path="/order/:id" component={EditOrder}/>
          <Route exact path="/listOrders" component={OrderBoard}/>
          <Route exact path="/listDragons" component={ListDragons}/>
            <Route exact path="/listNamesDragons" component={ListNamesDragons}/>

          <Footer />


        </Router>
  );
  }
}

export default App;
