import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layouts from "../components/layouts";
import Login from "../pages/login";
import {connect} from "react-redux"


class Routers extends Component {

    render(){
        const {currentUser} = this.props
        // return currentUser? (
        //     <Switch>
        //         {/* 登陆页面 */}
        //         <Route path="/login" component={ Login }/>
        //         {/* 主页面 */}
        //         <Route path='/' component={ Layouts } />
        //         {/* 404页面 */}
        //         <Redirect to='/404' />
        //     </Switch>
        // ) : (<Login></Login>)
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

const mapStateToProps = (state) => ({
    currentUser: state.getIn(["user","currentUser"]),
})

const mapDispatchToProps = (dispatch) => ({
   
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Routers))
