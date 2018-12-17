import { combineReducers } from 'redux-immutable';
import { reducer as userReducer } from "./modules/user";
import { reducer as goodsReducer } from "./modules/goods";

const reducers = combineReducers({
    //用户模块
    user: userReducer,
    //商品模块
    goods: goodsReducer,
    // //员工管理模块
    // staffManage: staffManageReducer,
    // //企业层级模块
    // corpHierarchy: corpHierarchyReducer,
});

export default reducers;