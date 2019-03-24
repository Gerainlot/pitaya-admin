import React from "react"
import {
     Modal, Form, Input,
  } from 'antd';

const SpecificationCreateForm = Form.create({ name: 'specification_add_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="新增一个规格属性"
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入要定义的规格的名称:例如颜色、尺寸等!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="排序">
                {getFieldDecorator('sortOrder')(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );
  
 export default SpecificationCreateForm; 