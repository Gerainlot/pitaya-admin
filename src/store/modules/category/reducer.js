import { fromJS } from 'immutable';
import * as actions from './actions';

const defaultState = fromJS({
    topCategories: [],
    childrenCategories: [],
    info : {},
    parent : {}
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case actions.Action_Update_Category_Top:
            return state.set("topCategories",fromJS(action.value))
        case actions.Action_Update_Category_Children:
            return state.set("childrenCategories",fromJS(action.value))
        case actions.Action_Update_Category_Info:
            return state.set("info",fromJS(action.value))
        case actions.Action_Update_Parent_Category_Info:
            return state.set("parent",fromJS(action.value))
        case actions.Action_Clean_Category_Info:
            return state.set("info",fromJS({}))
        case actions.Action_Clean_Parent_Category_Info:
            return state.set("parent",fromJS({}))
        default:
            return state;         
	}
}