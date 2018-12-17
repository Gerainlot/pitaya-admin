import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import { fromJS } from "immutable";
import classnames from "classnames";
import PicturesWall from "../../components/imageUpload";
import { actionCreators as goodsActionCreators } from "../../../../store/modules/goods";
import styles from "./index.module.scss";


class GoodsInfoForm extends Component {
    state = {
        picsList: [],
        updatePicsList: []
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            picsList: nextProps.goodsPicsList.toJS()
        })
    }
    //点击删除库存
    removeStock = (k) => {
        const { form } = this.props;
        let init_stocks = form.getFieldValue('init_stocks');
        form.setFieldsValue({
            init_stocks: init_stocks.filter((item, index) => {
                return index!==k
            }),
        });
    }
    //点击新增库存
    addStock = () => {
        const { form } = this.props;
        let init_stocks = form.getFieldValue('init_stocks');
        form.setFieldsValue({
            "init_stocks": init_stocks.push(fromJS({
                "id": null,
                "name": null,
                "status": null,
                "specification": null,
                "costUnitPrice": null,
                "saleUnitPrice": null,
                "totalQuantity": null,
                "availableQuantity": null,
                "shippingFee": null
            }))
        });
    }
    handleSubmit = () => {
        const { goodsInfo, updateGood, addGood } = this.props;
        const { picsList } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);  
                //库存
                if(values.stocks){
                    values.stocks = values.stocks.map((item)=>{
                        if(item.totalQuantity){
                            item.totalQuantity = parseInt(item.totalQuantity)
                        }
                        if(item.costUnitPrice){
                            item.costUnitPrice = parseInt(item.costUnitPrice)
                        }
                        if(item.saleUnitPrice){
                            item.saleUnitPrice = parseInt(item.saleUnitPrice)
                        }
                        if(item.shippingFee){
                            item.shippingFee = parseInt(item.shippingFee)
                        }
                        return item
                    })
                }else{
                    values.stocks = []
                }
                //图片
                let pictureIds = [];
                console.log(picsList)
                picsList.forEach(item => {
                    pictureIds.push(item.id)
                })
                
                let good = {};
                if(goodsInfo.getIn(["goods", "id"])){
                    //编辑商品
                    good = {
                        id: goodsInfo.getIn(["goods", "id"]),
                        name: values.name,
                        category: values.category,
                        producingArea: values.producingArea,
                        description: values.description,
                        stocks: values.stocks,
                        supplierId: values.supplierId,
                        pictureIds
                    }
                    updateGood(good,()=>{
                        // window.location.href="/goodsmanage/goodslist"
                    })      
                }else{
                    //新增商品
                    good = {
                        name: values.name,
                        category: values.category,
                        producingArea: values.producingArea,
                        description: values.description,
                        stocks: values.stocks,
                        supplierId: values.supplierId,
                        pictureIds
                    }
                    addGood(good,()=>{
                        // window.location.href="/goodsmanage/goodslist"
                    })      
                }
                  
            }
        });
    }
    changePicsList(fileList){
        console.log(fileList)
        this.setState({picsList: fileList},()=>{ console.log(this.state.picsList)})
    }
    removePicsList(file){
        console.log(file)
        const { deletePic } = this.props;
        deletePic(file.id)
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { supplierList } = this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        }

        //动态库存
        getFieldDecorator('init_stocks', { initialValue: this.props.goodsInfo.get("stocks")||fromJS([]) });
        const renderStockItems = getFieldValue('init_stocks').map((item, index) => {
            return (
                <ul key={index}>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].id`, {
                                initialValue: item.get("id"),
                            })(
                                <Input disabled={true}></Input>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].status`, {
                                initialValue: item.get("status")
                            })(
                                <Select style={{width: 170}} placeholder="请选择商品库存状态">
                                    <Select.Option value="IN_STOCK">有货</Select.Option>
                                    <Select.Option value="SUFFICIENT">充足</Select.Option>
                                    <Select.Option value="SELL_OUT">售罄</Select.Option>
                                    <Select.Option value="PREPARING">备货中</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].specification`, {
                                initialValue: item.get("specification")
                            })(
                                <Input placeholder="请输入规格"></Input>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].totalQuantity`, {
                                initialValue: item.get("totalQuantity"),
                                rules: [{ 
                                    type: "number", 
                                    message: "请填写数字",
                                    transform(value) {
                                        return parseInt(value);
                                    }
                                }],
                            })(
                                <Input placeholder="请输入库存数量"></Input>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].costUnitPrice`, {
                                initialValue: item.get("costUnitPrice")
                            })(
                                <Input placeholder="请输入成本单价"></Input>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].saleUnitPrice`, {
                                initialValue: item.get("saleUnitPrice")
                            })(
                                <Input placeholder="请输入销售单价"></Input>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <Form.Item>
                            {getFieldDecorator(`stocks[${index}].shippingFee`, {
                                initialValue: item.get("shippingFee")
                            })(
                                <Input placeholder="请输入快递费"></Input>
                            )}
                        </Form.Item>
                    </li>
                    <li className="inb">
                        <span onClick={()=>{this.removeStock(index)}}>删除</span>
                    </li>
                </ul>
            )
        })
        console.log(this.state.picsList)
        return (
            <Fragment>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div>基本信息</div>
                    <Form.Item 
                        {...formItemLayout}
                        label="商品名称"
                        colon={false}
                    >
                    {getFieldDecorator('name')(
                        <Input placeholder="请输入商品名称" />
                    )}
                    </Form.Item>
                    <Form.Item 
                        {...formItemLayout}
                        label="商品类别"
                        colon={false}
                    >
                    {getFieldDecorator('category')(
                        <Input placeholder="请输入商品类别" />
                    )}
                    </Form.Item>
                    <Form.Item 
                        {...formItemLayout}
                        label="商品状态"
                        colon={false}
                    >
                    {getFieldDecorator('status')(
                        <Select>
                            <Select.Option value="ON_SALE">在售</Select.Option>
                            <Select.Option value="OUT_SALE">下架</Select.Option>
                        </Select>
                    )}
                    </Form.Item>
                    <Form.Item 
                        {...formItemLayout}
                        label="生产地"
                        colon={false}
                    >
                    {getFieldDecorator('producingArea')(
                        <Input placeholder="请输入生产地" />
                    )}
                    </Form.Item>
                    <Form.Item 
                        {...formItemLayout}
                        label="商品描述"
                        colon={false}
                    >
                    {getFieldDecorator('description')(
                        <Input placeholder="请输入商品描述" />
                    )}
                    </Form.Item>
                    <Form.Item 
                        {...formItemLayout}
                        label="供应商"
                        colon={false}
                    >
                        {getFieldDecorator('supplierId')(
                            <Select>
                                {
                                    supplierList.map((item, index)=>(
                                        <Select.Option key={index} value={item.get("id")}>{item.get("name")}</Select.Option>
                                    ))
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <PicturesWall
                        picsList={this.state.picsList}
                        changePicsList={this.changePicsList.bind(this)}
                        removePicsList={this.removePicsList.bind(this)}
                        uploadUrl={"manage/goods/pictures/save"}    
                    ></PicturesWall>
                    <div>库存信息 <Button type="dashed" onClick={()=>{this.addStock()}} >新增库存</Button></div>
                    <ul>
                        <li className={classnames("inb", styles.thead)}>库存ID</li>
                        <li className={classnames("inb", styles.thead)}>库存状态</li>
                        <li className={classnames("inb", styles.thead)}>规格</li>
                        <li className={classnames("inb", styles.thead)}>库存数量</li>
                        <li className={classnames("inb", styles.thead)}>成本单价</li>
                        <li className={classnames("inb", styles.thead)}>销售单价</li>
                        <li className={classnames("inb", styles.thead)}>快递费</li>
                        <li className={classnames("inb", styles.thead)}>操作</li>
                    </ul>
                    {renderStockItems}
                </Form>
            </Fragment>
        )
    }
}
const WrappedGoodsInfoForm = Form.create({
    //当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange(props, changedFields) {
        console.log(props, changedFields)
    },
    //把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 Form.createFormField 标记
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "name"])
            }),
            category: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "category"])
            }),
            status: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "status"])
            }),
            producingArea: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "producingArea"])
            }),
            description: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "description"])
            }),
            supplierId: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "supplierId"])
            }),
            supplierName: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "supplierName"])
            }),
        };
    },
    //任一表单域的值发生改变时的回调
    onValuesChange(props, changedValues, allValues) {
        console.log(changedValues)
    },
})(GoodsInfoForm);

const mapStateToProps = (state) => ({
    goodsInfo: state.getIn(["goods", "goodsInfo"]),
    supplierList: state.getIn(["goods", "supplierList"]),
    goodsPicsList: state.getIn(["goods", "goodsPicsList"]),
})
const mapDispatchToProps = (dispatch) => ({
    //新增商品信息
    addGood(goods, callBack){
        dispatch(goodsActionCreators.addGood(goods, callBack))
    },
    //编辑商品信息
    updateGood(goods, callBack){
        dispatch(goodsActionCreators.updateGood(goods, callBack))
    },
    //删除图片
    deletePic(pictureId){
        dispatch(goodsActionCreators.deletePic(pictureId))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedGoodsInfoForm);