import { fromJS } from 'immutable';
import * as actions from './actions';

const defaultState = fromJS({
    attributeCategoryTableData: [],
    attributeCategoryPagination: {
        pageNo: 0, 
        pageSize: 0,
        total: 0,
    },
    attributeTableData:[],
    attributePagination : {
        pageNo: 0, 
        pageSize: 0,
        total: 0,
    }
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case actions.ACTION_UPDATE_ATTRI_CAT_TABLE:
            return state.merge({
                attributeCategoryTableData: fromJS(action.value.items),
                attributeCategoryPagination: fromJS({
                    pageNo: fromJS(action.value.pageNo), 
                    pageSize: fromJS(action.value.pageSize), 
                    total: fromJS(action.value.total), 
                })
            })
        case actions.ACTION_UPDATE_ATTRI_TABLE:
            return state.merge({
                attributeTableData: fromJS(action.value.items),
                attributePagination: fromJS({
                    pageNo: fromJS(action.value.pageNo), 
                    pageSize: fromJS(action.value.pageSize), 
                    total: fromJS(action.value.total), 
                })
            })
        default:
            return state;         
	}
}