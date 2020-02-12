import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

class PrivateRoute extends Component {

    componentDidMount() {
        if (!this.props.isUserLogin) {
            this.props.history.push("/");
        }
    }

    render() {
        return <Route {...this.props} />;
    }
}

export default withRouter(PrivateRoute);
