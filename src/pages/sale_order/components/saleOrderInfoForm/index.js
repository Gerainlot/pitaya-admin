import React, { Component, Fragment } from 'react';
import Http from '../../../../http/http'
import { Form, Input, Button ,Divider,Table, Select,Modal,} from "antd";
import EditableTable from "./editable_table";

const FormItem = Form.Item;
const Option = Select.Option;

class SaleOrderInfoForm extends Component {

    stock_headers = [{
        title: '库存ID',
        dataIndex: 'id',
        key: 'id',
      },{
        title: '成本单价',
        dataIndex: 'costUnitPrice',
        key: 'costUnitPrice',
      },{
        title: '销售单价',
        dataIndex: 'saleUnitPrice',
        key: 'saleUnitPrice',
      },{
        title: '库存名称',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '剩余库存',
        dataIndex: 'availableQuantity',
        key: 'availableQuantity',
      },{
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },]

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
        editable: true,
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
        stockModalVisible : false,
        loadedStocks:[],
        selectedStocks:[],
        saleStocks:[]
    };
   
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
        this.setState({saleStocks:[...this.state.saleStocks,...this.state.selectedStocks]},() => {
            console.log(this.state.saleStocks)
        })
        
    }

    setStockModalVisible(visible) {
        this.setState({ stockModalVisible : visible });
        if (visible){
            this.loadStockData()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({info: nextProps.info,saleStocks:nextProps.info.items})
    }

    componentDidMount() {
        console.log("componentDidMount...")
    }
    writePropBack = (data) => {
        this.setState({
            saleStocks: data
        })
    }

    handleSubmit = (e) => {
        const details = this.state.saleStocks
        this.props.form.validateFields((err, values) => {
          if (!err) {
            var requestBody = {...values,...{"details":details}}
            Http.postJson("/manage/sale/order/edit",requestBody).then((result => {
                console.log(result)
            }))
          }
        });
    }

    render() {
        const {info,saleStocks} = this.state
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
                            initialValue: info.order.receiver
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Divider orientation="left">商品明细:</Divider>
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
                            columns={this.stock_headers}
                            pagination={false}
                            >
                        </Table>
                    </Modal>
                    {
                        saleStocks && 
                        
                        <EditableTable 
                            columns={this.columns} 
                            dataSource={saleStocks}
                            writeBackFunc={this.writePropBack}
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