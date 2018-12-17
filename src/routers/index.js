import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layouts from "../components/layouts";
import Login from "../pages/login";


class Routers extends Component {
    render(){
        return (
            <Switch>
                {/* 登陆页面 */}
                <Route path="/login" component={ Login }/>
                {/* 主页面 */}
                <Route path='/' component={ Layouts } />
                {/* 404页面 */}
                <Redirect to='/404' />
            </Switch>
        )
    }
}

export default withRouter(Routers);