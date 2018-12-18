import * as constants from './constants';
import Http from "../../../http/http";

//获取销售列表数据
export const querySaleOrderList = (params) => {
    
    return (dispatch) => {
		Http.postJson('/manage/sale/order/list', params).then((res) => {
            const result = res.data;
			result && dispatch(updateSaleOrderTableData(result))
		})
	}
}

//获取销售详情数据
// 按照Redux文档说明此函数返回后应当进行component.setstate动作，不应该放在action的定义处，应该属于
// 表现层的动作
export const querySaleOrderInfo = (params) => {
    
    return (dispatch) => {
		Http.get('/manage/sale/order/info', params).then((res) => {
            const result = res.data;
			result && dispatch(updateSaleOrderInfoData(result))
		})
	}
}

//更新销售订单列表数据
export const updateSaleOrderTableData = (value) => ({
	type: constants.updateSaleOrderTableData,
	value
})

//更新销售订单详情数据
export const updateSaleOrderInfoData = (value) => ({
	type: constants.updateSaleOrderInfoData,
	value
})
