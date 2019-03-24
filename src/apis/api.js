
import config from "../config"

const apiRoot = config.dev.apiRootURL

// API-商品
export const api_specifications_all = apiRoot+"manage/specification/all"
export const api_categories_all = apiRoot+"manage/category/all"
export const api_goods_picture_upload = apiRoot+"manage/goods/pictures/save"
export const api_goods_stock_edit = apiRoot+"manage/goods/stock/edit"
export const api_goods_edit = apiRoot+"manage/goods/edit"
// API-供应商
export const api_supplier_add = apiRoot+"manage/supplier/add"
export const api_supplier_edit = apiRoot+"manage/supplier/edit"
export const api_supplier_list = apiRoot+"manage/supplier/list"
export const api_supplier_all = apiRoot+"manage/supplier/all"
export const api_supplier_info = apiRoot+"manage/supplier/info"