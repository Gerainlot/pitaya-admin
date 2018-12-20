import React, { Component, Fragment } from 'react';
// import { connect } from "react-redux";
import Http from '../../../../http/http'
import { Form, Input, Button ,Divider,Table, Row,Col,Modal} from "antd";
// import { fromJS } from "immutable";
// import classnames from "classnames";
// import { actionCreators as saleActionCreator } from "../../../../store/modules/sale_order";
// import styles from "./index.module.scss";
import EditableTable from "./editable_table";

const FormItem = Form.Item;

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
        modal1Visible : false,
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
        this.setModal1Visible(false);
        this.setState({saleStocks:[...this.state.saleStocks,...this.state.selectedStocks]},() => {
            console.log(this.state.saleStocks)
        })
        
    }

    setModal1Visible(visible) {
        this.setState({ modal1Visible : visible });
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
    save = ()=>{
        console.log(this.state.info)
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
                <Button className="primary" onClick={() => this.setModal1Visible(true)}>添加商品</Button>
                <Modal
                    title="选择商品"
                    style={{ top: 20}}
                    width={768}
                    visible={this.state.modal1Visible}
                    onOk={() => this.addSelectedStocks2SaleStocks()}
                    onCancel={() => this.setModal1Visible(false)}
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
                <Button onClick={this.save}>保存</Button>
            </Fragment>
            
        )
    }
}

export default SaleOrderInfoForm;