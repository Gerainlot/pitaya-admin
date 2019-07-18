import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Divider, Button } from 'antd';
import {saleOrderTableDataPageParams} from "../../../../utils/pageParams";

const { Column } = Table;

class SaleOrderTable extends Component {
    //点击分页
    handlePaginationChange = (pagination) => {
        const { onChangeListData } = this.props;
        onChangeListData(saleOrderTableDataPageParams(pagination.current))
    }

    handleDelete(e, id, a){
        console.log(e, id, a)
    }

    handlePay = (id) => {
        const { onPay } = this.props;
        if (onPay) {
            onPay(id)
        }
        
    }

    render() {
        const { tableData, pagination } = this.props;
        return (
            <Table 
                rowKey={record => record.id}
                dataSource={tableData}
                pagination={{
                    defaultCurrent: 1,
                    current: pagination.get("pageNo"),
                    pageSize: pagination.get("pageSize"),
                    total: pagination.get("total"),
                }}
                scroll={{x : 1300}}
                onChange={this.handlePaginationChange} 
            >
                <Column
                    title="id"
                    dataIndex="id"
                    key="id"
                    fixed="left"
                />
                <Column
                    title="订单号"
                    dataIndex="orderNo"
                    key="orderNo"
                    fixed="left"
                />
                <Column
                    title="下单时间"
                    dataIndex="createTime"
                    key="createTime"
                />
                <Column
                    title="状态"
                    dataIndex="status"
                    key="status"
                />
                <Column
                    title="手机号"
                    dataIndex="phoneNo"
                    key="phoneNo"
                />
                <Column
                    title="收货地址"
                    dataIndex="address"
                    key="address"
                />
                <Column
                    title="收件人"
                    dataIndex="receiver"
                    key="receiver"
                />
                <Column
                    title="订单总额"
                    dataIndex="orderAmt"
                    key="orderAmt"
                />
                 <Column
                    title="商品总额"
                    dataIndex="goodsAmt"
                    key="goodsAmt"
                />
                 <Column
                    title="运费"
                    dataIndex="expressFee"
                    key="expressFee"
                />
                 <Column
                    title="快递方式"
                    dataIndex="expressMethod"
                    key="expressMethod"
                />
                <Column
                    title="快递单号"
                    dataIndex="expressOrderNo"
                    key="expressOrderNo"
                />
                <Column
                    title="Action"
                    key="action"
                    fixed="right"
                    render={(text, record) => (
                        <Fragment>
                            <Link to={`/salemanage/info/${record.id}`}>详情</Link>
                            <Divider type="vertical" />
                            <span onClick={this.handleDelete.bind(this, record.id, 100)}>删除</span>
                            <Divider type="vertical" />
                            <Button type={"dashed"} onClick={this.handlePay.bind(this,record.id)}>付款</Button>
                        </Fragment>
                    )}
                />
            </Table>
        )
    }
}

export default withRouter(SaleOrderTable);