import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Form, Input, Select, Button ,Divider,Tag,Table, Row,Col} from "antd";
// import { fromJS } from "immutable";
// import classnames from "classnames";
import { actionCreators as saleActionCreator } from "../../../../store/modules/sale_order";
// import styles from "./index.module.scss";
import EditableTable from "./test";

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
        editable: true,
      }, {
        title: '数量',
        key: 'goodsQuantity',
        dataIndex: 'goodsQuantity',
        editable: true,
      }, 
      {
        title: '成本单价',
        key: 'costUnitPrice',
        dataIndex: 'costUnitPrice',
        editable: true,
      },
      {
        title: '销售单价',
        key: 'saleUnitPrice',
        dataIndex: 'saleUnitPrice',
        editable: true,
      },
      {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        editable: true,
      }];

    state = {
        info : {},
    };
   
    componentWillReceiveProps(nextProps) {
        this.setState({info: nextProps.info})
    }

    componentDidMount() {
        console.log("componentDidMount...")
    }
    getlist1data = (data)=>{
        this.setState({
            info: {...this.state.info, ...{items: data}}
        })
    }
    save = ()=>{
        console.log(this.state.info)
    }

    render() {
        const {info} = this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          };
        return(
            <Fragment>
                <Divider orientation="left">基本信息</Divider>
                {info.order && <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="订单号">
                                    <Input value={info.order.orderNo} disabled />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="状态"> 
                                    <span className="ant-form-text">{info.order.status}</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="下单时间"> 
                                    <span className="ant-form-text">{info.order.createTime}</span>
                                </FormItem>
                            </Col>
                        </Row>                   
                    </FormItem>
                    
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="订单总金额">
                                    <span className="ant-form-text">{info.order.orderAmt}</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="商品金额">
                                    <span className="ant-form-text">{info.order.goodsAmt}</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="运费">
                                    <span className="ant-form-text">{info.order.expressFee}</span>
                                </FormItem>
                            </Col>
                        </Row>        
                    </FormItem>
                    <Divider orientation="left">配送信息:</Divider>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="配送方式">
                                    <span className="ant-form-text">{info.order.expressMethod}</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="快递单号">
                                    <span className="ant-form-text">{info.order.expressOrderNo}</span>
                                </FormItem>
                            </Col>
                            
                        </Row>        
                    </FormItem>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="收件人">
                                    <span className="ant-form-text">{info.order.receiver}</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="收件人手机号">
                                    <span className="ant-form-text">{info.order.phoneNo}</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label="收件地址">
                                    <span className="ant-form-text">{info.order.address}</span>
                                </FormItem>
                            </Col>
                            
                        </Row>        
                    </FormItem>
                </Form>}
                
                <Divider orientation="left">商品明细:</Divider>
                {
                    info.items && 
                    <EditableTable 
                        columns={this.columns} 
                        dataSource={info.items}
                        getData={this.getlist1data}
                    ></EditableTable>
                    // <Table rowKey={record => record.id} columns={this.columns} dataSource={info.items} pagination={false}></Table>
                }
                <Divider orientation="left">付款信息:</Divider>
                <Button onClick={this.save}>保存</Button>
            </Fragment>
            
        )
    }
}

export default SaleOrderInfoForm;