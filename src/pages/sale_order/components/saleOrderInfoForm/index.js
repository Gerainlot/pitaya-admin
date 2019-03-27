import React, { Component, Fragment } from 'react';
import Http from '../../../../http/http'
import { Form, Input, Button ,Divider,Table, Select,Modal,} from "antd";
import EditableTable from "./editable_table";
import {api_sale_order_edit} from "../../../../api"
import {stock_headers,sale_detail_columns} from "./defs"

const FormItem = Form.Item;
const Option = Select.Option;

class SaleOrderInfoForm extends Component {

    state = {
        info : {},
        stockModalVisible : false,
        loadedStocks:[],
        selectedStocks:[],
        saleDetails:[]
    };
   
    componentWillReceiveProps(nextProps) {
        this.setState({info: nextProps.info,saleDetails:nextProps.info.items})
    }

    componentDidMount() {
        console.log("componentDidMount...")
    }

    loadStockData(){
        Http.postJson('/manage/stock/list', {}).then((res) => {
            this.setState({loadedStocks:res.data})
		})
    }

    onStockSelected(selectedRows){
        var slectedStocks = selectedRows.map(function(row) { 
            var ss = {};
            ss.id = 0;
            ss.orderNo = null;
            ss.goodsId = row.goodsId;
            ss.goodsName = row.name;
            ss.stockId = row.id;
            ss.costUnitPrice = row.costUnitPrice;
            ss.saleUnitPrice = row.saleUnitPrice;
            return ss;
         })
        this.setState({selectedStocks:slectedStocks})
    }

    addSelectedStocks2SaleStocks() {
        this.setStockModalVisible(false);
        this.setState({saleDetails:[...this.state.saleDetails,...this.state.selectedStocks]},() => {
            console.log(this.state.saleDetails)
        })
        
    }

    setStockModalVisible(visible) {
        this.setState({ stockModalVisible : visible });
        if (visible){
            this.loadStockData()
        }
    }

    setSaleDetails = (data) => {
        this.setState({
            saleDetails: data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const details = this.state.saleDetails
        const {form} = this.props
        form.validateFields((err, values) => {
          if (!err) {
            var requestBody = {...values,...{"details":details}}
            Http.postJson(api_sale_order_edit,requestBody).then((result => {
                console.log(result)
            }))
          }
        });
    }

    render() {
        const {info,saleDetails} = this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          };
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.onStockSelected(selectedRows)
            }
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                {info.order && <Form onSubmit={this.handleSubmit}>
                <Divider orientation="left">基本信息</Divider>
                {
                    getFieldDecorator('id', {
                    initialValue: info.order.id
                })}
                <FormItem {...formItemLayout} label="订单号" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('orderNo', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                        initialValue: info.order.orderNo
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="状态" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: 'Please input your note!' }],
                        initialValue: info.order.status
                    })(
                        <Select style={{ width: 120 }}>
                            <Option value="REFUNDING">退款中</Option>
                            <Option value="WT_PAY">待付款</Option>
                            <Option value="PAYED">已付款</Option>
                            <Option value="CREATED">已创建</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="下单时间" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    <Input defaultValue={info.order.createTime} disabled />
                </FormItem>
                <FormItem {...formItemLayout} label="订单总金额" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    <Input defaultValue={info.order.orderAmt} disabled />
                </FormItem>
                <FormItem {...formItemLayout} label="商品金额" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    <Input defaultValue={info.order.goodsAmt} disabled />
                </FormItem>
                
                   
                <Divider orientation="left">配送信息:</Divider>
                    <FormItem label="配送方式" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('expressMethod', {
                            rules: [{ required: true, message: '请输入快递方式' }],
                            initialValue: info.order.expressMethod
                        })(
                        <Select style={{ width: 120 }}>
                            <Option value="yunda">韵达快递</Option>
                            <Option value="yuantong">圆通快递</Option>
                            <Option value="zhongtong">中通快递</Option>
                            <Option value="shunfeng">顺丰快递</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem  label="运费" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} name="expressFee">
                        {getFieldDecorator('expressFee', {
                            rules: [{ required: true, message: '请输入快递费用' }],
                            initialValue: info.order.expressFee
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem  label="快递单号" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} name="expressOrderNo">
                        {getFieldDecorator('expressOrderNo', {
                            rules: [{ required: true, message: '请输入快递费用' }],
                            initialValue: info.order.expressOrderNo
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label="收件人" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} name="receiver">
                    {getFieldDecorator('receiver', {
                            rules: [{ required: true, message: '请输入收件人' }],
                            initialValue: info.order.receiver
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label="收件人手机号" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} name="phoneNo">
                    {getFieldDecorator('phoneNo', {
                            rules: [{ required: true, message: '请输入收件人手机号' }],
                            initialValue: info.order.phoneNo
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label="收件地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} name="address">
                    {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入收件人地址' }],
                            initialValue: info.order.address
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Divider orientation="left">订单明细:</Divider>
                    <Button type="primary" onClick={() => this.setStockModalVisible(true)}>添加商品</Button>
                    <Modal
                        title="选择商品"
                        style={{ top: 20}}
                        width={768}
                        visible={this.state.stockModalVisible}
                        onOk={() => this.addSelectedStocks2SaleStocks()}
                        onCancel={() => this.setStockModalVisible(false)}
                        >
                        <Table 
                            rowSelection={rowSelection}
                            rowKey={record => record.id}
                            bordered
                            dataSource={this.state.loadedStocks}
                            columns={stock_headers}
                            pagination={false}
                            >
                        </Table>
                    </Modal>
                    {
                        saleDetails && 
                        
                        <EditableTable 
                            columns={sale_detail_columns} 
                            dataSource={saleDetails}
                            writeBackFunc={this.setSaleDetails}
                        ></EditableTable>
                    }
                    <Divider orientation="left">付款信息:</Divider>
                    <Button type="primary" htmlType="submit">保存</Button>    
                </Form>}
            </Fragment>
            
        )
    }
}

const WrappedSaleOrderInfoForm = Form.create()(SaleOrderInfoForm)

export default WrappedSaleOrderInfoForm;