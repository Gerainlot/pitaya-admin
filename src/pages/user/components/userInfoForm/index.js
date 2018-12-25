import React, { Component, Fragment } from 'react';
import Http from '../../../../http/http'
import { Form, Input, Button ,Divider,Icon, Select,Modal,Row,Col} from "antd";
import EditableTable from "../../components/table/editable_table";
import DrawerForm from "./drawer_form"

const FormItem = Form.Item;
const Option = Select.Option;

class UserInfoForm extends Component {

    columns = [{
        title: '地址ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '收件人',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '手机号',
        dataIndex: 'phoneNo',
        key: 'phoneNo',
      }, {
        title: '地址详情',
        key: 'address',
        dataIndex: 'address',
        editable: true,
      }];

    state = {
        userBasicInfo : {},
    };

    componentWillReceiveProps(nextProps) {
        this.setState({userBasicInfo: nextProps.info})
    }

    componentDidMount() {
        console.log("componentDidMount...")
    }
   
    handleSubmit = (e) => {
        const details = this.state.saleStocks
        this.props.form.validateFields((err, values) => {
          if (!err) {
            var requestBody = {...values,...{"details":details}}
            Http.postJson("/manage/user/edit",requestBody).then((result => {
                console.log(result)
            }))
          }
        });
    }

    render() {
        const {userBasicInfo} = this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          };
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                {userBasicInfo && <Form onSubmit={this.handleSubmit}>
                <Divider orientation="left">基本信息</Divider>
                <FormItem {...formItemLayout} label="用户ID" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                        initialValue: userBasicInfo.id
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                        initialValue: userBasicInfo.name
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="手机号" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('phoneNo', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                        initialValue: userBasicInfo.phoneNo
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="邮箱" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                        initialValue: userBasicInfo.email
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="微信ID" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('wechatId', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                        initialValue: userBasicInfo.wechatId
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                   
                <Divider orientation="left">配送地址 :</Divider>
                <DrawerForm></DrawerForm>
                <EditableTable columns={this.columns}></EditableTable>
                <Row>
                    <Col offset={5} span={16}>
                        <div style={{"textAlign":"right"}}>
                            <Button type="primary" htmlType="submit">保存</Button>   
                        </div>
                    </Col>
                </Row>
                </Form>}
            </Fragment>
            
        )
    }
}

const WrappedUserInfoForm = Form.create()(UserInfoForm)

export default WrappedUserInfoForm;