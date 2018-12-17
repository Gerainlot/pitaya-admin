import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Divider } from 'antd';
import {goodsTableDataPageParams} from "../../../../utils/pageParams";

const { Column } = Table;

class GoodsTable extends Component {
    //点击分页
    handlePaginationChange = (pagination)=>{
        const { onChangeListData } = this.props;
        onChangeListData(goodsTableDataPageParams(pagination.current))
    }
    //点击删除
    handleDelete(e, id, a){
        console.log(e, id, a)
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
                onChange={this.handlePaginationChange} 
            >
                <Column
                    title="id"
                    dataIndex="id"
                    key="id"
                />
                <Column
                    title="name"
                    dataIndex="name"
                    key="name"
                />
                <Column
                    title="category"
                    dataIndex="category"
                    key="category"
                />
                <Column
                    title="producingArea"
                    dataIndex="producingArea"
                    key="producingArea"
                />
                <Column
                    title="description"
                    dataIndex="description"
                    key="description"
                />
                <Column
                    title="createTime"
                    dataIndex="createTime"
                    key="createTime"
                />
                <Column
                    title="updateTime"
                    dataIndex="updateTime"
                    key="updateTime"
                />
                <Column
                    title="supplierId"
                    dataIndex="supplierId"
                    key="supplierId"
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Fragment>
                            <Link to={`/goodsmanage/goodsInfo/${record.id}`}>编辑商品信息</Link>
                            <Divider type="vertical" />
                            <span onClick={this.handleDelete.bind(this, record.id, 100)}>删除</span>
                        </Fragment>
                    )}
                />
            </Table>
        )
    }
}

export default withRouter(GoodsTable);