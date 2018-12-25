import {
    Drawer, Form, Button, Input, Icon,
  } from 'antd';
import React from 'react'
  class DrawerForm extends React.Component {
    state = { visible: false };
  
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            <Icon type="plus" /> 新增地址
          </Button>
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
                    })(<Input.TextArea rows={4} placeholder="请输入详细的收件地址 xxx省xxx市xxx区/县xxx 街道门牌号" />)}
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
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        </div>
      );
    }
  }
  
  export default DrawerForm = Form.create()(DrawerForm);
  
  