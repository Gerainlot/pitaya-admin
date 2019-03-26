
import React from "react"
import {api_specifications_all} from '../../../../api'
import Http from '../../../../http/http'
import { connect } from "react-redux";
import {
    Form, Input, Icon, Button, Col, Row, Select,Card
  } from 'antd';
const Option = Select.Option

class DynamicStockSet extends React.Component {

  state = {
    allSpecifications : []
  }

  componentDidMount(){
    Http.get(api_specifications_all).then((data) => {
      this.setState({
        allSpecifications : data.data
      })
    })
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let stocks = form.getFieldValue('goodsStocks');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
        keys: keys.filter((item,index) => index !== k),
    });
    // can use data-binding to set
    form.setFieldsValue({
        stocks: stocks.filter((item,index) => index !== k),
    });
    
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let goodsStocks = form.getFieldValue('goodsStocks');
    const nextKeys = keys.concat(goodsStocks.length);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    console.log("add before stocks = ",goodsStocks)
    goodsStocks.push(this.newEmptyStock())
    console.log("add after stocks = ",goodsStocks)
    form.setFieldsValue({
        goodsStocks: goodsStocks,
    });
  }

  newEmptyStock() {
    return {
        "id" : 0,
        warehouseId : 0,
        "costUnitPrice" : 0.00,
        "saleUnitPrice" : 0.00,
        "shippingFee" : 0.00,
        "availableQuantity" : 0,
        "specifications" : [],
    }
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    const {getstocksForm} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        getstocksForm(values)
      }
    });
  }

  handleSpecificationChange = () => {

  }

  handleChange = () => {

  }

  // 获取商品的规格定义选项
  getSpecificationOptions() {
    const {goodsInfo} = this.props
    const goodsSpecs = goodsInfo.specifications
    console.log("getSpecificationOptions",goodsSpecs)
    if (goodsSpecs){
        return goodsSpecs.map((item) => {
            return (
                <Option value={item.id}>{item.value}</Option>
            )
        })
    }
  }

  // 获取仓库的下拉选项集合
  getWarehouseOptions() {
      const {supplier} = this.props
      const warehouses = supplier.warehouses
      console.log("-- getWarehouseOptions is ",warehouses)
      if (warehouses && warehouses.length > 0 ){
         return warehouses.map((item) => {
              return (
                  <Option value={item.id}>{item.name}</Option>
              )
          })
      }
  } 

  // 获取库存的规格定义
  initalizeGoodsStocks() {
    const {goodsInfo,goodsStocks} = this.props
    const goodsSpecs = goodsInfo.specifications || []
    if (goodsStocks != null && goodsStocks.length > 0){
        const stocksWithSpecs = goodsStocks.map((item) => {
            // like 1_2_3 format to [1,2,3]
            const goods_spec_ids = item.specification.split("_")
            // 库存规格与商品规格定义对应stock -> specifications[{specificationObject}]
            const stock_specs = goodsSpecs.filter(gs => {
                let flag = false;
                goods_spec_ids.forEach(item1 => {
                    if (gs.id == item1) {
                        flag = true
                    } 
                })
                return flag
            })
            item.specifications = stock_specs
            return item
        })
        this.props.form.getFieldDecorator('goodsStocks', { initialValue: stocksWithSpecs ? stocksWithSpecs : [] });
    }
  }

  getFields = () => {
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
          },
        };
      const {goodsStocks} = this.props
      this.initalizeGoodsStocks()
      getFieldDecorator('keys', { initialValue: goodsStocks ? goodsStocks.map((item,index) => {
        return index 
      }) : [] });
      const keys = getFieldValue('keys');
      const stocks = getFieldValue("goodsStocks")
      const hasStocks = stocks && stocks.length > 0
      console.log("has stocks = ",hasStocks,"stocks = ",stocks)
      const formItems = keys.map((item, index) => {
        const options = this.getSpecificationOptions()
        const warehouseOptions = this.getWarehouseOptions()
        return (
        <Card title={'库存-'+(hasStocks ? stocks[index].id : 0)} style={{"marginBottom":10}}>
        <Row gutter={24}>
            {getFieldDecorator(`stocks[${index}].id`, {
                initialValue : hasStocks ? stocks[index].id : 0,
            })(
                <Input placeholder="库存ID" hidden={true}/>
            )}
        <Col span={6}>
            <Form.Item {...formItemLayout} label={'成本单价'} required={false}>
            {getFieldDecorator(`stocks[${index}].costUnitPrice`, {
                initialValue : hasStocks ? stocks[index].costUnitPrice : 0.00,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{required: true,whitespace: false,message: "请输入成本单价",}],
            })(
                <Input placeholder="成本单价" />
            )}
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item {...formItemLayout} label={'零售价'} required={false}>
            {getFieldDecorator(`stocks[${index}].saleUnitPrice`, {
                initialValue : hasStocks ? stocks[index].saleUnitPrice : 0.00,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{required: true,whitespace: false,message: "请输入零售价",}],
            })(
                <Input placeholder="零售价" />
            )}
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item {...formItemLayout} label={'运费'} required={false}>
            {getFieldDecorator(`stocks[${index}].shippingFee`, {
                initialValue : hasStocks ? stocks[index].shippingFee : 0.00,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{required: true,whitespace: false,message: "请输入运费",}],
            })(
                <Input placeholder="运费" />
            )}
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item {...formItemLayout} label={'库存(件)'} required={false}>
            {getFieldDecorator(`stocks[${index}].availableQuantity`, {
                initialValue : hasStocks ? stocks[index].availableQuantity : 0,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{required: true,whitespace: false,message: "库存数量",}],
            })(
                <Input placeholder="库存数量" />
            )}
            </Form.Item>
        </Col> 
        
        <Col span={6}>
            <Form.Item {...formItemLayout} label={'规格'} required={false}>
            {getFieldDecorator(`stocks[${index}].specifications`, {
                initialValue : (hasStocks && stocks[index].specifications.length > 0) ? stocks[index].specifications.map(item => {
                    console.log("Option-",item)
                    return item.id
                }) : [],
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{required: true,whitespace: false,message: "请选择库存规格",}],
            })(
                <Select
                    mode="multiple"
                    placeholder="请选择规格"
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                >
                    {options}
                </Select>
            )}
            </Form.Item>
        </Col>

        <Col span={6}>
            <Form.Item {...formItemLayout} label={'仓库'} required={false}>
            {getFieldDecorator(`stocks[${index}].warehouseId`, {
                initialValue : (hasStocks && stocks[index].warehouseId),
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{required: true,whitespace: false,message: "请选择仓库",}],
            })(
                <Select
                    placeholder="请选择仓库"
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                >
                    {warehouseOptions}
                </Select>
            )}
            </Form.Item>
        </Col>
        
        {keys.length > 1 ? (
                <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(index)}
                />
            ) : null}
        </Row>
        </Card>
      )});
      return formItems
  }

  render() {
    const formItems = this.getFields()
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
          {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
                <Icon type="plus" /> 添加库存
            </Button>
        </Form.Item>
      </Form>
    );
  }
}
  
const WrappedDynamicStockSet = Form.create(
  { 
    name: 'dynamic_form_item', //当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  }

)(DynamicStockSet);

const mapStateToProps = (state) => ({
    goodsInfo: state.getIn(["goods", "goodsInfo","goods"]).toJS(),
    goodsStocks : state.getIn(["goods", "goodsInfo","stocks"]) ? state.getIn(["goods", "goodsInfo","stocks"]).toJS() : [],
    supplier : state.getIn(["supplier","info"]).toJS()
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicStockSet);
