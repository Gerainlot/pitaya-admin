import {
    Drawer, Form, Button, Input, Icon,
  } from 'antd';

import React from 'react'
class DrawerForm extends React.Component {
    state = { 
      visible: false,
      afterCommit: () => {},
      afterClose: () => {},
      dataOnEditing:{}
    };

    componentWillReceiveProps(nextProps) {
      this.setState({
        afterCommit:nextProps.afterCommit,
        afterClose: nextProps.afterClose,
        visible:nextProps.visible})
    }

    handleSave = (e) => {
      this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.afterCommit(values)
        this.onClose()
      }
    });
    }

    onClose = () => {
      this.setState({visible:false})
      this.state.afterClose()
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Drawer
            title="新增收件地址"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
            style={{
              overflow: 'auto',
              height: 'calc(100% - 108px)',
              paddingBottom: '108px',
            }}
          >
            <Form layout="vertical" hideRequiredMark>
             
                  <Form.Item hidden>
                    {getFieldDecorator('id', {
                      rules: [{ required: false, message: '请输入收件人姓名' }],
                    })(<Input hidden/>)}
                  </Form.Item>
                  <Form.Item label="收件人">
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入收件人姓名' }],
                    })(<Input placeholder="请输入收件人姓名" />)}
                  </Form.Item>
              
                  <Form.Item label="手机号">
                    {getFieldDecorator('phoneNo', {
                      rules: [{ required: true, message: '请输入手机号' }],
                    })(
                      <Input
                        placeholder="请输入手机号"
                      />
                    )}
                  </Form.Item>
               
                  <Form.Item label="收件地址">
                    {getFieldDecorator('address', {
                      rules: [
                        {
                          required: true,
                          message: '请输入详细的收件地址',
                        },
                      ],
                    })(<Input.TextArea rows={4} placeholder="请输入详细的收件地址 xx省xx市xx区/县xx街道门牌号" />)}
                  </Form.Item>
            </Form>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.handleSave} type="primary">
                保存
              </Button>
            </div>
          </Drawer>
        </div>
      );
    }
  }
  
  export default DrawerForm = Form.create({
    onFieldsChange(props, changedFields) {
      
    },
    mapPropsToFields(props) {
      return {
        id: Form.createFormField({
          value: props.dataOnEditing?props.dataOnEditing.id:0,
        }),
        name: Form.createFormField({
          value: props.dataOnEditing?props.dataOnEditing.name:"",
        }),
        phoneNo: Form.createFormField({
          value: props.dataOnEditing?props.dataOnEditing.phoneNo:"",
        }),
        address: Form.createFormField({
          value: props.dataOnEditing?props.dataOnEditing.address:"",
        }),
      };
    },
    onValuesChange(_, values) {
      
    },
  })(DrawerForm);
  
  