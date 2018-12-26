import React, { Component, Fragment } from 'react';
import Http from '../../../../http/http'
import { Form, Input, Button ,Divider, Row, Col} from "antd";

const FormItem = Form.Item;
class UserAddForm extends Component {

    componentDidMount() {
        console.log("componentDidMount")
    }
   
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            var requestBody = values
            Http.postJson("/manage/user/add",requestBody).then((result => {
                console.log(result)
            }))
          }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          };
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                <Form>
                    <Divider orientation="left">基本信息</Divider>
                    <FormItem {...formItemLayout} label="姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入用户名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="手机号" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('phoneNo', {
                            rules: [{ required: true, message: '请输入手机号' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="邮箱" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '邮箱格式不合法',
                                }, {
                                required: true, message: '请输入用户邮箱',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Row>
                        <Col offset={5} span={12}>
                            <div style={{"textAlign":"right"}}>
                                <Button type="primary" onClick={this.handleSubmit}>保存</Button>   
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Fragment>
            
        )
    }
}

const WrappedUserAddForm = Form.create()(UserAddForm)

export default WrappedUserAddForm;