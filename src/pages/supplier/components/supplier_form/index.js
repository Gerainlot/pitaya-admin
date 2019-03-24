import React from "react"
import {Form, Input, Card,Col,Row ,Icon,Button} from 'antd';
import { connect } from "react-redux";

class SupplierInfo extends React.Component {

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let stocks = form.getFieldValue('goodsStocks');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
        keys: keys.filter((item,index) => index !== k),
    });
    // can use data-binding to set
    form.setFieldsValue({
        stocks: stocks.filter((item,index) => index !== k),
    });
    
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let form_warehouses = form.getFieldValue('form_warehouses');
    const nextKeys = keys.concat(form_warehouses.length);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    console.log("add before form_warehouses = ",form_warehouses)
    form_warehouses.push(this.newEmptyWarehouse())
    console.log("add after form_warehouses = ",form_warehouses)
    form.setFieldsValue({
        form_warehouses: form_warehouses,
    });
  }

  newEmptyWarehouse() {
    return {
        "id" : 0,
        "name" : ""
    }
  }

  getWarehouseFormItems = () => {
    const {getFieldDecorator,getFieldValue} = this.props.form
    const {warehouses} = this.props.supplier
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    getFieldDecorator("form_warehouses",{initialValue : warehouses ? warehouses : []})
    getFieldDecorator('keys', { initialValue: warehouses ? warehouses.map((item,index) => {
      return index 
    }) : [] });
    const keys = getFieldValue('keys');
    const formWarehouses = getFieldValue("form_warehouses")
    const flag = formWarehouses && formWarehouses.length > 0
    console.log("getWarehouseFormItems",formWarehouses)
    const formItems = keys.map((item, index) => {
    return (
      <Card title={'仓库-'+(flag ? formWarehouses[index].id : 0)} style={{"marginBottom":10}}>
            <Row gutter={24}>
            <Col span={6}>
              <Form.Item {...formItemLayout} label={'仓库ID'} required={false}>
                {getFieldDecorator(`warehouses[${index}].id`, {
                  initialValue : flag ? formWarehouses[index].id : 0
                })(
                    <Input placeholder="仓库ID" />
                )}
              </Form.Item>
            </Col>
                
            <Col span={6}>
                <Form.Item {...formItemLayout} label={'名称'} required={false}>
                {getFieldDecorator(`warehouses[${index}].name`, {
                    initialValue : flag ? formWarehouses[index].name : "",
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{required: true,whitespace: false,message: "请输入成本单价",}],
                })(
                    <Input placeholder="仓库名称" />
                )}
                </Form.Item>
            </Col>
            {keys.length > 1 ? (
                    <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(index)}
                    />
                ) : null}
            </Row>
        </Card>
    )})
    return formItems
}

  render() {
    const {form} = this.props;
    const { getFieldDecorator } = form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const warehouseItems = this.getWarehouseFormItems()
    return (
      
        <Form layout="horizontal">
          <Card title="供应商信息" style={{"marginTop": 16}}>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '' }],
          })(<Input hidden="true"/> )}
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '' }],
            })(<Input /> )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('address')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="联系人">
            {getFieldDecorator('contactName')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phoneNo')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="营业执照">
            {getFieldDecorator('license')(<Input type="textarea" />)}
          </Form.Item>
          </Card>
          <Card title="仓库信息" style={{"marginTop": 16}}>
            {warehouseItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
                  <Icon type="plus" /> 添加仓库
              </Button>
            </Form.Item>
          </Card>
          
        </Form>
      
    );
  }
}

const SupplierInfoForm = Form.create(
{ 
  name: 'suppiler_info_form' ,
  //当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  onFieldsChange(props, changedFields) {
    // console.log(props, changedFields)
  },

  //把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 Form.createFormField 标记
  mapPropsToFields(props) {
    return {
        id: Form.createFormField({
            value: props.supplier.supplier.id
        }),
        name: Form.createFormField({
            value: props.supplier.supplier.name
        }),
        address: Form.createFormField({
            value: props.supplier.supplier.address
        }),
        email: Form.createFormField({
            value: props.supplier.supplier.email
        }),
        contactName: Form.createFormField({
            value: props.supplier.supplier.contactName
        }),
        phoneNo: Form.createFormField({
            value: props.supplier.supplier.phoneNo
        }),
        license: Form.createFormField({
            value: props.supplier.supplier.license
        }),
        
    };
},

  //任一表单域的值发生改变时的回调
  onValuesChange(props, changedValues, allValues) {
    // console.log(changedValues)
  },

}
)(SupplierInfo);

const mapStateToProps = (state) => ({
  supplier: state.getIn(["supplier", "info"]).toJS(),
})
const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(SupplierInfoForm);
