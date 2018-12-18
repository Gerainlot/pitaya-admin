import { combineReducers } from 'redux-immutable';
import { reducer as userReducer } from "./modules/user";
import { reducer as goodsReducer } from "./modules/goods";
import { reducer as saleReducer } from "./modules/sale_order";

const reducers = combineReducers({
    //用户模块
    user: userReducer,
    //商品模块
    goods: goodsReducer,
    sale: saleReducer,
    // //员工管理模块
    // staffManage: staffManageReducer,
    // //企业层级模块
    // corpHierarchy: corpHierarchyReducer,
});

export default reducers;