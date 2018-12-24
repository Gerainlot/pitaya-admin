import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Divider } from 'antd';
import {userTableDataPageParams} from "../../../../utils/pageParams";

const { Column } = Table;

class UserTable extends Component {
    //点击分页
    handlePaginationChange = (pagination) => {
        const { onChangeListData } = this.props;
        onChangeListData(userTableDataPageParams(pagination.current))
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
                    title="姓名"
                    dataIndex="name"
                    key="name"
                />
                <Column
                    title="手机号"
                    dataIndex="phoneNo"
                    key="phoneNo"
                />
                <Column
                    title="邮箱"
                    dataIndex="email"
                    key="email"
                />
                <Column
                    title="微信ID"
                    dataIndex="wechatId"
                    key="wechatId"
                />
               
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Fragment>
                            <Link to={`/usermanage/info/${record.id}`}>详情</Link>
                            <Divider type="vertical" />
                            <span onClick={this.handleDelete.bind(this, record.id, 100)}>删除</span>
                        </Fragment>
                    )}
                />
            </Table>
        )
    }
}

export default withRouter(UserTable);