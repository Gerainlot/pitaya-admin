import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Form, Input, Select, Button ,Divider,Tag,Table} from "antd";
// import { fromJS } from "immutable";
// import classnames from "classnames";
import { actionCreators as saleActionCreator } from "../../../../store/modules/sale_order";
// import styles from "./index.module.scss";

const FormItem = Form.Item;

class SaleOrderInfoForm extends Component {

    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '商品ID',
        dataIndex: 'goodsId',
        key: 'goodsId',
      }, {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '数量',
        key: 'goodsQuantity',
        dataIndex: 'goodsQuantity',
      }, 
      {
        title: '成本单价',
        key: 'costUnitPrice',
        dataIndex: 'costUnitPrice',
      },
      {
        title: '销售单价',
        key: 'saleUnitPrice',
        dataIndex: 'saleUnitPrice',
      },
      {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
      }];

    state = {
        info : {}
    };
   
    componentWillReceiveProps(nextProps) {
        this.setState({info: nextProps.info})
    }

   componentDidMount() {
       console.log("componentDidMount...")
   }

    render() {
        const {info} = this.state
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 20 },
          };
        // return null
        return(
            <Fragment>
                <Divider orientation="left">基本信息</Divider>
                {info.order && <Form onSubmit={this.handleSubmit}>
                    <FormItem
                    {...formItemLayout}
                    label="订单号"
                    >
                    <span className="ant-form-text">{info.order.orderNo}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="状态"> 
                        <span className="ant-form-text">{info.order.status}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="下单时间">
                        <span className="ant-form-text">{info.order.createTime}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="供应商ID">
                        <span className="ant-form-text">{"未设置"}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="订单总金额">
                        <span className="ant-form-text">{info.order.orderAmt}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品金额">
                        <span className="ant-form-text">{info.order.goodsAmt}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="运费">
                        <span className="ant-form-text">{info.order.expressFee}</span>
                    </FormItem>
                    
                </Form>}
                <Divider orientation="left">配送信息:</Divider>
                <Divider orientation="left">商品明细:</Divider>
                {
                    info.items && 
                    <Table columns={this.columns} dataSource={info.items} pagination={false}></Table>
                }
                <Divider orientation="left">付款信息:</Divider>
            </Fragment>
            
        )
    }
}

export default SaleOrderInfoForm;