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
                    title="名称"
                    dataIndex="name"
                    key="name"
                />
                <Column
                    title="分类"
                    dataIndex="category"
                    key="category"
                />
                <Column
                    title="产地"
                    dataIndex="producingArea"
                    key="producingArea"
                />
                <Column
                    title="描述"
                    dataIndex="description"
                    key="description"
                />
                <Column
                    title="创建时间"
                    dataIndex="createTime"
                    key="createTime"
                />
                <Column
                    title="更新时间"
                    dataIndex="updateTime"
                    key="updateTime"
                />
                <Column
                    title="供应商"
                    dataIndex="supplierId"
                    key="supplierId"
                />
                <Column
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <Fragment>
                            <Link to={`/goodsmanage/goodsInfo/${record.id}`}>编辑</Link>
                            <Divider type="vertical" />
                            <Link to={`/goodsmanage/stock/info/${record.id}/${record.supplierId}`}>库存</Link>
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