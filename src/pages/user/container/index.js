import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import UserList from "../pages/user_list";
import UserInfo from "../pages/user_info";
import UserAdd from "../pages/user_add";
class UserManageLayouts extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/usermanage/list' component={UserList} name='用户列表'></Route>
                <Route exact path='/usermanage/info/:id' component={UserInfo} name='用户详情'></Route>
                <Route exact path='/usermanage/add' component={UserAdd} name='新增用户'></Route>
            </Fragment>
        )
    }
}
export default withRouter(UserManageLayouts);