import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import GoodsList from "../pages/goodsList";
import GoodsInfo from "../pages/goodsInfo";


class GoodsManageLayouts extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/goodsmanage/goodslist' component={GoodsList} name='商品列表'></Route>
                <Route exact path='/goodsmanage/goodsInfo/:goodsId' component={GoodsInfo} name='商品信息'></Route>
                <Route exact path='/goodsmanage/addgoods' component={GoodsInfo} name='新增商品'></Route>
            </Fragment>
        )
    }
}
export default withRouter(GoodsManageLayouts);