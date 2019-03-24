import { fromJS } from 'immutable';
import * as actions from './actions';

const defaultState = fromJS({
    specificationTableData: [],
    specificationPagination: {
        pageNo: 0, 
        pageSize: 0,
        total: 0,
    },
    specificationInfo:{}
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case actions.ACTION_UPDATE_SPEC_TABLE:
            return state.merge({
                specificationTableData: fromJS(action.value.items),
                specificationPagination: fromJS({
                    pageNo: fromJS(action.value.pageNo), 
                    pageSize: fromJS(action.value.pageSize), 
                    total: fromJS(action.value.total), 
                })
            })
        case actions.ACTION_UPDATE_SPEC_INFO:
            return state.set("specificationInfo", fromJS(action.value))
        default:
            return state;         
	}
}