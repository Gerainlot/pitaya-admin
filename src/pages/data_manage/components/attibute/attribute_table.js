import React, { Component, Fragment } from 'react';
import { Table, Divider, Button } from 'antd';
import {defaultPagination} from "../../../../utils/pageParams";


const { Column } = Table;

class AttributeTable extends Component {

    constructor(props) {
        super()
        console.log("attributetable props = ",props)
    }

    handlePaginationChange = (pagination) => {
        const { onChangeListData } = this.props;
        onChangeListData(defaultPagination(pagination.current))
    }

    onDetailClick = (id) => {
        const { onInfoChange } = this.props;
        onInfoChange(id)

    }

    handleDelete(id){
        console.log(id)
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
                            <Button type="danger" onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
                        </Fragment>
                    )}
                />
            </Table>
                
            </Fragment>
            
        )
    }
}

export default AttributeTable;