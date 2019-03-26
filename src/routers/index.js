import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layouts from "../components/layouts";
import Login from "../pages/login";
import TokenManager from '../http/token_manager'

class Routers extends Component {

    isLogin = () => {
       const {accessToken} =  TokenManager.getTokens()
       if (accessToken) {
           console.log("you have already login access token is ",accessToken)
           return true
       }
       return false
    }

    render(){
        return this.isLogin() ? (
            <Switch>
                {/* 登陆页面 */}
                <Route path="/login" component={ Login }/>
                {/* 主页面 */}
                <Route path='/' component={ Layouts } />
                {/* 404页面 */}
                <Redirect to='/404' />
            </Switch>
        ) : (<Login></Login>)
        
    }
}

export default withRouter(Routers)
