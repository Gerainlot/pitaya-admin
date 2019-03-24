import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Layout } from "antd";
import LayoutHeader from "../layoutHeader";
import styles from "./index.module.scss";

import GoodsManageLayouts from "../../../../pages/goods";
import SaleOrderManageLayouts from "../../../../pages/sale_order";
import UserManageLayouts from "../../../../pages/user";
import DataManageRoutes from "../../../../pages/data_manage/routes/index"
import SupplierManageRoutes from '../../../../pages/supplier'
import HomeLayouts from "../../../../pages/home";


class Right extends Component {
    render() {
        return (
            <Layout className={styles.right}>
                <LayoutHeader />
                <Layout.Content className={styles.content}>
                    <Route path='/home' component={HomeLayouts} name='首页' />
                    <Route path='/goodsmanage' component={GoodsManageLayouts} name='商品管理' />
                    <Route path='/salemanage' component={SaleOrderManageLayouts} name='销售订单管理'/>
                    <Route path='/usermanage' component={UserManageLayouts} name='用户管理'/>
                    <Route path='/datamanage' component={DataManageRoutes} name='数据管理'/>
                    <Route path='/supplier' component={SupplierManageRoutes} name='供应商管理'/>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    Custom Service Admin ©2018 Created by Pitaya UED
                </Layout.Footer> 
            </Layout>
        )
    }
}

export default withRouter(Right);