import Http from "../../../http/http";

export const Action_Update_Category_Top= "category.top.update";
export const Action_Update_Category_Children= "category.children.update";
export const Action_Update_Parent_Category_Info= "category.parent.info.update";
export const Action_Update_Category_Info= "category.info.update";
export const Action_Clean_Category_Info= "category.info.clean";
export const Action_Clean_Parent_Category_Info= "category.parent.info.clean";

const api_category_top = "/manage/category/top"
const api_category_children = "/manage/category/children"
const api_category_info = "/manage/category/info"

export const queryTopCategories = (params) => {
    return (dispatch) => {
		Http.get(api_category_top, params).then((res) => {
			const result = res.data;
			result && dispatch(updateCategoryTopData(result))
		})
	}
}

export const queryChildrenCategories = (params) => {
    return (dispatch) => {
		Http.get(api_category_children, params).then((res) => {
			const result = res.data;
			result && dispatch(updateCategoryChidrenData(result))
		})
	}
}

export const queryCategoryInfo = (categoryId,isParent) => {
    return (dispatch) => {
		Http.get(api_category_info, {id:categoryId}).then((res) => {
			const result = res.data;
			if (result) {
				if (isParent) {
					dispatch(updateParentCategoryInfoData(result))
				}else {
					dispatch(updateCategoryInfoData(result))
				}
				
			}
		})
	}
}

export const resetCategoryInfo = (isParent) => {
    return (dispatch) => {
		if (isParent) {
			dispatch(cleanParentCategoryInfo())
		}else {
			dispatch(cleanCategoryInfo())
		}
	}
}

export const updateCategoryTopData = (value) => ({
	type: Action_Update_Category_Top,
	value
})

export const updateCategoryChidrenData = (value) => ({
	type: Action_Update_Category_Children,
	value
})

export const updateCategoryInfoData = (value) => ({
	type: Action_Update_Category_Info,
	value
})

export const updateParentCategoryInfoData = (value) => ({
	type: Action_Update_Parent_Category_Info,
	value
})

export const cleanParentCategoryInfo = (value) => (
	{
		type: Action_Clean_Parent_Category_Info,
		value
	}
)

export const cleanCategoryInfo = (value) => (
	{
		type: Action_Clean_Category_Info,
		value
	}
)


