import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SupplierListPage from "../pages";
import SupplierInfoPage from "../pages/supplier_info_page"

class SupplierManageRoutes extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/supplier/list' component={SupplierListPage} name='供应商列表'></Route>
                <Route exact path='/supplier/info/:id' component={SupplierInfoPage} name='供应商信息'></Route>
                <Route exact path='/supplier/add' component={SupplierInfoPage} name='供应商信息'></Route>
            </Fragment>
        )
    }
}
export default withRouter(SupplierManageRoutes);