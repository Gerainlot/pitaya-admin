import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button } from 'antd';
import styles from "./index.module.scss";
import {api_user_login} from "../../api"
import Http from '../../http/http'
import TokenManager from '../../http/token_manager'

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
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends Component {

    login = (params) => {
        let { user, password } = params;
		Http.postJson(api_user_login, {
            user,
            password
        }).then((res) => {
            const token = res.data.token;
            TokenManager.setTokens(token)
            this.props.history.push("/")
		})
	}

    render() {
        return (
            <Fragment>
                <div className={styles.login_center}>
                    <WrappedNormalLoginForm
                        onLoginSubmit={this.login} 
                    />
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Login);