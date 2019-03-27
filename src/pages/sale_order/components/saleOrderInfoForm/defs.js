import React from "react"
export const stock_headers = [{
    title: '库存ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '成本单价',
    dataIndex: 'costUnitPrice',
    key: 'costUnitPrice',
  },{
    title: '销售单价',
    dataIndex: 'saleUnitPrice',
    key: 'saleUnitPrice',
  },{
    title: '库存名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '剩余库存',
    dataIndex: 'availableQuantity',
    key: 'availableQuantity',
  },{
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },]

export const sale_detail_columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '商品ID',
    dataIndex: 'goodsId',
    key: 'goodsId',
  }, {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
  }, {
    title: '数量',
    key: 'quantity',
    dataIndex: 'quantity',
    editable: true,
  }, 
  {
    title: '成本单价',
    key: 'costUnitPrice',
    dataIndex: 'costUnitPrice',
  },
  {
    title: '销售单价',
    key: 'saleUnitPrice',
    dataIndex: 'saleUnitPrice',
    editable: true,
  },
];