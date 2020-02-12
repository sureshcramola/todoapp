import React, { Component } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Utility from "../common/utility";

class CustomRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogin: false
    }
  }

  renderRoute() {
    const loginStoreData = Utility.getData("loginStore");
    if (this.props.private) {
      return <PrivateRoute {...this.props} isUserLogin={loginStoreData ? loginStoreData.isUserLogin : false} />;
    } else {
      return <Route {...this.props} />;
    }
  }
  
  render() {
    return <React.Fragment>{this.renderRoute()}</React.Fragment>;
  }
}

export default CustomRoute;