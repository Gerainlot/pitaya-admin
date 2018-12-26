import React, { Component, Fragment } from 'react';
import Http from '../../../../http/http'
import { Form, Input, Table,Button ,Divider,Row,Col,Icon} from "antd";
import DrawerForm from "./drawer_form"
const FormItem = Form.Item;

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
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button onClick={(e) => this.editAddress(record)}>编辑</Button>
          </span>
        ),
      }];

    state = {
        userInfo : {},
        addresses : [],
        drawerVisible : false,
        userAddressOnEditing : {}
    };

    editAddress = (record) => {
        console.log(record)
        this.setState({userAddressOnEditing:{...record}})
        this.showDrawer()
    }

    addAddress = () => {
        this.setState({userAddressOnEditing: null,},() => {this.showDrawer()})
    }

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };
    
    closeDrawer = () => {
        this.setState({
            drawerVisible: false,
            userAddressOnEditing: null
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({userInfo:nextProps.info,addresses:nextProps.addresses})
    }

    componentDidMount() {
        console.log('componentDidMount',this.userId)
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

    afterCommit = (params) => {
        var requestBody = {...params,...{"userId":this.state.userInfo.id}}
        console.log("afterCommit",requestBody)
        Http.postJson("/manage/user/address/edit",requestBody).then((result) => {
            this.setState({userAddressOnEditing:{}})
            this.queryUserAddresses()
        })
    }

    queryUserAddresses = () => {
        Http.get('/manage/user/address/list', {"userId":this.state.userInfo.id}).then((res) => {
            const result = res.data.address;
			this.setState({addresses:result})
		})
    }

    render() {
        const {userAddressOnEditing,userInfo,addresses} = this.state
        console.log("user addresses userAddressOnEditing.. ",userAddressOnEditing)
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          };
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                {userInfo && <Form onSubmit={this.handleSubmit}>
                <Divider orientation="left">基本信息</Divider>
                <FormItem {...formItemLayout} label="用户ID" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                        initialValue: userInfo.id
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                        initialValue: userInfo.name
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="手机号" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('phoneNo', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                        initialValue: userInfo.phoneNo
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
                        initialValue: userInfo.email
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="微信ID" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('wechatId', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                        initialValue: userInfo.wechatId
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                   
                <Divider orientation="left">配送地址 :</Divider>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus" /> 新增地址
                </Button>
                <DrawerForm afterCommit={this.afterCommit} dataOnEditing={userAddressOnEditing} visible={this.state.drawerVisible}></DrawerForm>
                <Table
                    rowKey={record => record.id}
                    bordered
                    dataSource={addresses}
                    columns={this.columns}
                    pagination={false}
                />
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