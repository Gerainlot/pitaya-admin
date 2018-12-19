import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SaleOrderList from "../pages/sale_list";
import SaleOrderInfo from "../pages/sale_info"
import EditableTable from "../components/saleOrderInfoForm/test"

class SaleOrderManageLayouts extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/salemanage/list' component={SaleOrderList} name='销售订单列表'></Route>
                <Route exact path='/salemanage/info/:id' component={SaleOrderInfo} name='销售订单详情'></Route>
                <Route exact path='/salemanage/test' component={EditableTable} name='测试编辑Table'></Route>
            </Fragment>
        )
    }
}
export default withRouter(SaleOrderManageLayouts);