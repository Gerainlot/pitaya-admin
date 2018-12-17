import * as constants from './constants';
import Http from "../../../http/http";



//获取商品列表数据
export const getGoodsTableData = (params) => {
    return (dispatch) => {
		Http.postJson('/manage/goods/list', params).then((res) => {
            const result = res.data;
			result&&dispatch(updateGoodsTableData(result))
		})
	}
}
//更新商品列表数据
export const updateGoodsTableData = (value) => ({
	type: constants.updateGoodsTableData,
	value
})
//获取选中的商品基本信息
export const getGoodsBasicInfo = (goodsId) => {
    return (dispatch) => {
        Http.get('/manage/goods/info?id='+ goodsId, {}).then((res) => {
            const result = res.data;
            result&&dispatch(updateGoodsBasicInfo(result))
        })
    }
}
//更新选中的商品信息
export const updateGoodsBasicInfo = (value) => ({
	type: constants.updateGoodsBasicInfo,
	value
})
//获取选中的商品库存信息
export const getGoodsStocksInfo = (goodsId) => {
    return (dispatch) => {
        Http.get('manage/goods/stock/list?goodsId='+ goodsId, {}).then((res) => {
            const result = res.data;
            result&&dispatch(updateGoodsStocksInfo(result))
        })
    }
}
//更新选中的商品库存信息
export const updateGoodsStocksInfo = (value) => ({
	type: constants.updateGoodsStocksInfo,
	value
})
//清除商品信息
export const clearGoodsInfo = () => ({
	type: constants.clearGoodsInfo,
})
//编辑商品信息
export const updateGood = (goods, callBack) => {
    return (dispatch) => {
        Http.postJson('manage/goods/edit', goods).then((res) => {
            if(res.status==="success"){
                callBack()
            }
        })
    }
}
//新增商品信息
export const addGood = (goods, callBack) => {
    return (dispatch) => {
        Http.postJson('manage/goods/add', goods).then((res) => {
            if(res.status==="success"){
                callBack()
            }
        })
    }
}
//获取供应商列表信息
export const getSupplierList = () => {
    return (dispatch) => {
        Http.get('manage/supplier/list', {}).then((res) => {
            const result = res.data;
            result&&dispatch(updateSupplierList(result))
        })
    }
}
//更新供应商列表信息
export const updateSupplierList = (value) => ({
	type: constants.updateSupplierList,
	value
})
//获取商品图片列表
export const getGoodsPicsList = (goodsId) => {
    return (dispatch) => {
        Http.get('/manage/goods/picture/list?goodsId='+ goodsId, {}).then((res) => {
            const result = res.data;
            result&&dispatch(updateGoodsPicsList(result))
        })
    }
}
//更新商品图片列表
export const updateGoodsPicsList = (value) => ({
	type: constants.updateGoodsPicsList,
	value
})
//删除图片
export const deletePic = (pictureId) => {
    return (dispatch) => {
        Http.post('/manage/goods/picture/delete?pictureId='+pictureId, {}).then((res) => {
            if(res.status==="success"){
                console.log("删除成功")
            }
        })
    }
}