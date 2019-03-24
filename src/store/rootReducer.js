import { combineReducers } from 'redux-immutable';
import { reducer as userReducer } from "./modules/user";
import { reducer as goodsReducer } from "./modules/goods";
import { reducer as saleReducer } from "./modules/sale_order";
import {reducer as specificationReducer} from "./modules/specification"
import {reducer as attributeReducer} from "./modules/attribute"
import {reducer as categoryReducer} from "./modules/category"
import {reducer as supplierReducer} from "./modules/supplier"

const reducers = combineReducers({
    user: userReducer,
    goods: goodsReducer,
    sale: saleReducer,
    specification : specificationReducer,
    attribute : attributeReducer,
    category : categoryReducer,
    supplier : supplierReducer,
});

export default reducers;