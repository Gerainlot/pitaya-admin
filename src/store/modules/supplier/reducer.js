import { fromJS } from 'immutable';
import * as actions from './actions';

const defaultState = fromJS({
    suppliers : [],
    supplierPagination : {},
    info : {
        "supplier" : {},
        "warehouses" : []
    }
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case actions.action_set_suppliers:
            return state.merge({
                suppliers: fromJS(action.value.items),
                supplierPagination: fromJS({
                    pageNo: fromJS(action.value.pageNo), 
                    pageSize: fromJS(action.value.pageSize), 
                    total: fromJS(action.value.total), 
                })
            })
        case actions.action_set_supplier_info:
            return state.merge({
               info : fromJS({
                   supplier : fromJS(action.value.supplier),
                   warehouses : fromJS(action.value.warehouses)
               }) 
            })
        default:
            return state;         
	}
}