import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    //当前登录用户
    currentUser: null,
    userTableData: [],
    userTablePagination: {
        pageNo: 0, 
        pageSize: 0,
        total: 0,
    },
    userInfoData : {}
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case constants.updateCurrentUser:
            return state.set("currentUser", fromJS(action.value));
        case constants.updateStoreUserTableData:
            return state.set("userTableData", fromJS(action.value))
        case constants.updateStoreUserInfoData:
            return state.set("userInfoData",fromJS(action.value))
		default:
            return state;         
	}
}