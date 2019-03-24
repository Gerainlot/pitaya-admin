import { Drawer } from 'antd';
import React from "react"
import AttributeTable from './attribute_table';

class AttributeDrawer extends React.Component {
  
  render() {
    // 可以使用redux来存储状态变量避免多层属性传递
    const {tableData,pagination,onChangeListData,categoryId} = this.props
    return (
      <div>
        <Drawer
          title="属性列表"
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
          width = {512}
        >
          <AttributeTable 
          tableData={tableData} 
          pagination={pagination}
          onChangeListData = {onChangeListData}
          categoryId = {categoryId}
          ></AttributeTable>
        </Drawer>
      </div>
    );
  }
}

export default AttributeDrawer
