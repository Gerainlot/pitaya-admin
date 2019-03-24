import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    //商品列表数据
    goodsTableData: [],
    //商品列表分页数据
    goodsTableDataPagination: {
        pageNo: 0, 
        pageSize: 0,
        total: 0,
    },
    //选中的商品信息
    goodsInfo: {
        "goods": {},
        "stocks": []
    },
    //供应商列表
    supplierList: [],
    //商品图片列表
    goodsPicsList: [],
    // 商品分类列表
    categoryList : []
});

export default (state = defaultState, action) => {
	switch(action.type) {
        case constants.updateGoodsTableData:
            return state.merge({
                goodsTableData: fromJS(action.value.items),
                goodsTableDataPagination: fromJS({
                    pageNo: fromJS(action.value.pageNo), 
                    pageSize: fromJS(action.value.pageSize), 
                    total: fromJS(action.value.total), 
                })
            })
        case constants.updateGoodsBasicInfo:
            return state.setIn(["goodsInfo", "goods"], fromJS(action.value.goods))
        case constants.updateGoodsStocksInfo:
            return state.setIn(["goodsInfo", "stocks"], fromJS(action.value.stocks))
        case constants.clearGoodsInfo:
            return state.set("goodsInfo", fromJS({
                "goods": {},
                "stocks": [],
                "goodsPicsList": []
            }))
        case constants.updateSupplierList:
            return state.set("supplierList", action.value.suppliers?fromJS(action.value.suppliers):fromJS([]))
        case constants.updateGoodsPicsList:
            return state.set("goodsPicsList", action.value.pictures?fromJS(action.value.pictures):fromJS([]))
        case constants.action_update_category_list:
            return state.set("categoryList",action.value?fromJS(action.value):fromJS([]))
		default:
            return state;         
	}
}