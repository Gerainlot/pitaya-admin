import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    //销售订单列表数据
    saleOrderTableData: [],
    //销售订单列表分页数据
    saleOrderTableDataPagination: {
        pageNo: 0, 
        pageSize: 0,
        total: 0,
    },
    //选中的销售订单信息
    saleOrderInfo: {
        "order": {},
        "items": []
    },
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case constants.updateSaleOrderTableData:
            return state.merge({
                saleOrderTableData: fromJS(action.value.items),
                saleOrderTableDataPagination: fromJS({
                    pageNo: fromJS(action.value.pageNo), 
                    pageSize: fromJS(action.value.pageSize), 
                    total: fromJS(action.value.total), 
                })
            })
        case constants.updateSaleOrderInfoData:
            return state.set("saleOrderInfo", fromJS(action.value))
        default:
            return state;         
	}
}