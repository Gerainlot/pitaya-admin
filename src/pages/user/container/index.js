import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import UserList from "../pages/user_list";
import UserInfo from "../pages/user_info";
class UserManageLayouts extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/usermanage/list' component={UserList} name='用户列表'></Route>
                <Route exact path='/usermanage/info/:id' component={UserInfo} name='用户详情'></Route>
                {/* <Route exact path='/salemanage/add' component={SaleOrderAdd} name='新建销售订单'></Route> */}
            </Fragment>
        )
    }
}
export default withRouter(UserManageLayouts);