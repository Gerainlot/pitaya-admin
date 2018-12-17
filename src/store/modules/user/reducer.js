import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    //当前登录用户
    currentUser: null,
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case constants.updateCurrentUser:
            return state.set("currentUser", fromJS(action.value));
		default:
            return state;         
	}
}