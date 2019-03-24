import React, { Component, Fragment } from 'react';
import { Table, Divider, Button } from 'antd';

const { Column } = Table;

class CategoryTable extends Component {

    constructor(props) {
        super()
    }

    onEditClick = (id) => {
        const { onEdit } = this.props;
        onEdit(id)
    }

    onAddClick = (categoryId) => {
        const { onAddClick } = this.props;
        onAddClick(categoryId)
    }

    handleDelete(id){

    }

    render() {
        const { tableData } = this.props;
        return (
            <Fragment>
                <Table 
                rowKey={record => record.id}
                dataSource={tableData}
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
                    title="文案"
                    dataIndex="frontName"
                    key="frontName"
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Fragment>
                            <Button type="primary" onClick={this.onEditClick.bind(this,record.id)}>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary" onClick={this.onAddClick.bind(this,record.id)}>添加子分类</Button>
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

export default CategoryTable;