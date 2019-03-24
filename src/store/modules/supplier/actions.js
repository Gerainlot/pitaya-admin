import Http from "../../../http/http";
import {
	api_supplier_add,
	api_supplier_list,
	api_supplier_info,
	api_supplier_edit,
} from "../../../apis/api"

export const action_set_suppliers= "supplier.table.update";
export const action_set_supplier_info= "supplier.info.update";

export const querySupplierList = (params) => {
    return (dispatch) => {
		Http.postJson(api_supplier_list, params).then((res) => {
			const result = res.data;
			result && dispatch(actionSetSupplierList(result))
		})
	}
}

export const querySupplierInfo = (id) => {
    return (dispatch) => {
		Http.get(api_supplier_info+"?id="+id, {})
		.then((res) => {
			const result = res.data;
			result && dispatch(actionSetSupplierInfo(result))
		})
	}
}

export const createSupplier = (params) => {
    return (dispatch) => {
		Http.postJson(api_supplier_add, params)
	}
}

export const updateSupplier = (params) => {
    return (dispatch) => {
		Http.postJson(api_supplier_edit, params)
	}
}

export const actionSetSupplierList = (value) => ({
	type: action_set_suppliers,
	value
})

export const actionSetSupplierInfo = (value) => ({
	type: action_set_supplier_info,
	value
})



