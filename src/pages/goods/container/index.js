import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import GoodsList from "../pages/goods_list_page";
import GoodsInfo from "../pages/goods_info_page";
import StockInfo from "../pages/goods_stock_page"

class GoodsManageLayouts extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/goodsmanage/goodslist' component={GoodsList} name='商品列表'></Route>
                <Route exact path='/goodsmanage/goodsInfo/:goodsId' component={GoodsInfo} name='商品信息'></Route>
                <Route exact path='/goodsmanage/addgoods' component={GoodsInfo} name='新增商品'></Route>
                <Route exact path='/goodsmanage/stock/info/:goodsId/:supplierId' component={StockInfo} name='商品库存'></Route>
            </Fragment>
        )
    }
}
export default withRouter(GoodsManageLayouts);