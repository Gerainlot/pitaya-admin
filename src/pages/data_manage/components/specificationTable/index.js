import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Button } from 'antd';
import {specificationTableDataPageParams} from "../../../../utils/pageParams";


const { Column } = Table;

class SpecificationTable extends Component {

    //点击分页
    handlePaginationChange = (pagination) => {
        const { onChangeListData } = this.props;
        onChangeListData(specificationTableDataPageParams(pagination.current))
    }

    onDetailClick = (id) => {
        const { onInfoChange } = this.props;
        onInfoChange(id)

    }

    //点击删除
    handleDelete(e, id, a){
        console.log(e, id, a)
    }

    render() {
        const { tableData, pagination } = this.props;
        return (
            <Fragment>
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
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Fragment>
                            <Button type="primary" onClick={this.onDetailClick.bind(this,record.id)}>详情</Button>
                            <Divider type="vertical" />
                            <Button onClick={this.handleDelete.bind(this, record.id, 100)}>删除</Button>
                        </Fragment>
                    )}
                />
            </Table>
                
            </Fragment>
            
        )
    }
}

export default SpecificationTable;