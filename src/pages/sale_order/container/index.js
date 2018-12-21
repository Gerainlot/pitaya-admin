import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SaleOrderList from "../pages/sale_list";
import SaleOrderInfo from "../pages/sale_info"
import SaleOrderAdd from "../pages/sale_add"

class SaleOrderManageLayouts extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/salemanage/list' component={SaleOrderList} name='销售订单列表'></Route>
                <Route exact path='/salemanage/info/:id' component={SaleOrderInfo} name='销售订单详情'></Route>
                <Route exact path='/salemanage/add' component={SaleOrderAdd} name='新建销售订单'></Route>
            </Fragment>
        )
    }
}
export default withRouter(SaleOrderManageLayouts);