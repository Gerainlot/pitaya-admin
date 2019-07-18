import React ,{ Component, Fragment }from "react"
import { Link } from 'react-router-dom';
import {
    Form, Row, Col, Input, Button, Select,
  } from 'antd';
import styles from "./index.module.scss"
const Option = Select.Option
class AdvancedSearchForm extends Component {
    state = {
      expand: false,
    };
  
    getSearchFields() {
      const { getFieldDecorator } = this.props.form;
      return (
          <Fragment>
            <Col span={8}>
                <Form.Item label={"订单号"} className={styles.ant_form_item}>
                    {getFieldDecorator("orderNo")(
                        <Input placeholder="订单号" />
                    )}
                </Form.Item>
                
            </Col>
            <Col span={8}>
                <Form.Item label={"状态"} className={styles.ant_form_item}>
                    {getFieldDecorator('status', {
                        initialValue: ""
                    })(
                        <Select style={{ width: 120 }}>
                            <Option value="">全部</Option>
                            <Option value="REFUNDING">退款中</Option>
                            <Option value="PAYED">已付款</Option>
                            <Option value="CREATED">待付款</Option>
                        </Select>
                    )}
                </Form.Item>
            </Col>
            </Fragment> 
         )
    }
  
    handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
      });
    }
  
    handleReset = () => {
      this.props.form.resetFields();
    }
  
    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    }
  
    render() {
      return (
        <Form
          className={styles.ant_advanced_search_form}
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>{this.getSearchFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
              <Link to="/salemanage/add" style={{ marginLeft: 8 }}>
                <Button type="primary">新增订单</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      );
    }
  }
  
  export default Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
  