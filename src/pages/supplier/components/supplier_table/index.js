import React, { Component, Fragment} from 'react';
import { Table, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import {defaultPagination} from "../../../../utils/pageParams";


const { Column } = Table;

class SupplierTable extends Component {

    handlePaginationChange = (pagination) => {
        const { onChangeListData } = this.props;
        onChangeListData(defaultPagination(pagination.current))
    }

    onDetailClick = (id) => {
        const { onInfoChange } = this.props;
        onInfoChange(id)
    }

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
                <Column title="ID" dataIndex="id" key="id"/>
                <Column title="名称" dataIndex="name" key="name"/>
                <Column title="地址" dataIndex="address" key="address"/>
                <Column title="邮箱" dataIndex="email" key="email"/>
                <Column title="联系人" dataIndex="contactName" key="contactName"/>
                <Column title="手机号" dataIndex="phoneNo" key="phoneNo"/>
                <Column title="营业执照" dataIndex="license" key="license"/>
                    
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Fragment>
                            <Link to={`/supplier/info/${record.id}`}>
                                <Button type="primary" onClick={this.onDetailClick.bind(this,record.id)}>详情</Button>
                            </Link>
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

export default SupplierTable;