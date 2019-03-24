import Http from "../../../http/http";

export const ACTION_UPDATE_ATTRI_CAT_TABLE= "attribute.category.table.update";
export const ACTION_UPDATE_ATTRI_TABLE= "attribute.table.update";

const api_attribute_category_list = "/manage/attribute/category/list"
const api_attribute_list = "/manage/attribute/list"

export const queryAttributeCategoryList = (params) => {
    return (dispatch) => {
		Http.postJson(api_attribute_category_list, params).then((res) => {
			const result = res.data;
			result && dispatch(updateAttributeCategoryTableData(result))
		})
	}
}

export const queryAttributeList = (params) => {
    return (dispatch) => {
		Http.postJson(api_attribute_list, params).then((res) => {
			const result = res.data;
			result && dispatch(updateAttributeTableData(result))
		})
	}
}

export const updateAttributeCategoryTableData = (value) => ({
	type: ACTION_UPDATE_ATTRI_CAT_TABLE,
	value
})

export const updateAttributeTableData = (value) => ({
	type: ACTION_UPDATE_ATTRI_TABLE,
	value
})


