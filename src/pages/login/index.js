import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button } from 'antd';
import { actionCreators as userActionCreators  } from "../../store/modules/user";
import styles from "./index.module.scss";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { onLoginSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                onLoginSubmit(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.loginform}>
                <FormItem>
                    {getFieldDecorator('user', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className={styles.loginformbutton}>
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


class Login extends Component {
    render() {
        const { loginUser } = this.props;
        return (
            <Fragment>
                <WrappedNormalLoginForm
                    onLoginSubmit={loginUser} 
                ></WrappedNormalLoginForm>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedCorp: state.getIn(["corpManage", "selectedCorp"]),
})
const mapDispatchToProps = (dispatch) => ({
    //登陆用户
    loginUser(params){
        dispatch(userActionCreators.loginUser(params))
    },
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));