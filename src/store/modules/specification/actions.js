import Http from "../../../http/http";

export const ACTION_UPDATE_SPEC_TABLE= "specification.table.update";
export const ACTION_UPDATE_SPEC_INFO= "specification.info.update";

export const API_SPEC_LIST = "/manage/specification/list"
export const API_SPEC_INFO = "/manage/specification/info"

//获取规格列表
export const querySpecificationList = (params) => {
    
    return (dispatch) => {
		Http.postJson(API_SPEC_LIST, params).then((res) => {
			const result = res.data;
			console.log("result 规格 redux action",result)
			result && dispatch(updateSpecificationTableData(result))
		})
	}
}

//获取规格列表
export const querySpecificationInfo = (params) => {
    
    return (dispatch) => {
		Http.get(API_SPEC_INFO, params).then((res) => {
			const result = res.data;
			result && dispatch(updateSpecificationInfoData(result))
		})
	}
}

//更新规格列表数据
export const updateSpecificationTableData = (value) => ({
	type: ACTION_UPDATE_SPEC_TABLE,
	value
})

export const updateSpecificationInfoData = (value) => ({
	type: ACTION_UPDATE_SPEC_INFO,
	value
})

