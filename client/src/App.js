import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import Navbar from "./components/Navbar";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const store = require("./reducers/store").init();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="rentals" />;
                }}
              />
              <Route exact path="/rentals" component={RentalListing} />
              <Route exact path="/rentals/:id" component={RentalDetail} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
