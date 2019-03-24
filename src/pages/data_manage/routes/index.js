import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SpecificationListPage from "../pages/specification_index";
import AttributeListPage from "../pages/attribute_index";
import CategoryIndexPage from "../pages/cat_index";


class DataManageRoutes extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/datamanage/specification' component={SpecificationListPage} name='规格基础数据'></Route>
                <Route exact path='/datamanage/attribute' component={AttributeListPage} name='属性基础数据'></Route>
                <Route exact path='/datamanage/category' component={CategoryIndexPage} name='商品分类首页'></Route>
            </Fragment>
        )
    }
}
export default withRouter(DataManageRoutes);