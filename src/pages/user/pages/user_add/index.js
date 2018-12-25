import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import UserAddForm from "../../components/userAddForm";


class UserAddPage extends Component {
    componentDidMount(){
        
    }
    render() {
        return (
            <Fragment>
                <UserAddForm></UserAddForm>
            </Fragment>
        )
    }
}
export default withRouter(UserAddPage);