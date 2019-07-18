import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { actionCreators as goodsActionCreators } from "../../../../store/modules/goods";
import { fromJS } from "immutable";
import { Form, Input, Select, Divider } from "antd";
import PicturesWall from "./goods_picture_wall";
import {api_goods_picture_upload} from '../../../../api'

class GoodsInfoForm extends Component {

    state = {
        picsList: [],
        listPics : [],
        updatePicsList: [],
        allCategories : []
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            picsList : nextProps.goodsPicsList.toJS(),
            allCategories : nextProps.categoryList.toJS(),
            listPics : [this.newFile(-1,nextProps.goodsInfo.getIn(["goods"]).toJS().listPicUrl)]
        })
    }

    newFile = (id,url) => {
        return {
          uid: id,
          url: url,
        }
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
    
    changePicsList(fileList){
        this.setState({picsList: fileList},()=>{ console.log(this.state.picsList)})
    }

    removePicsList(file){
        const { deletePic } = this.props;
        deletePic(file.id)
    }

    changeListPics(fileList) {
        this.setState({listPics : fileList})
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        const { supplierList } = this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          };

        return (
            <Fragment>
                <Form>
                    <Divider orientation="left">基本信息</Divider>
                    <Form.Item {...formItemLayout} label="商品名称">
                        {getFieldDecorator('name',{
                            rules: [
                                { required: true, message: '商品名称为必填项' },
                            ],
                        })(
                            <Input placeholder="请输入商品名称" />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="简要描述">
                        {getFieldDecorator('briefDescription',{
                            rules: [
                                { required: true, message: '简要描述为必填项' },
                            ],
                        })(
                            <Input placeholder="请对商品进行简要描述" />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品类别">
                        {getFieldDecorator('category',{
                            rules: [
                                { required: true, message: '请选择商品分类' },
                            ],
                        })(
                            <Select placeholder="请选择商品分类">
                                {this.state.allCategories.map(item => {
                                    return (
                                        <Select.Option value={item.id}>{item.name}</Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item  {...formItemLayout} label="商品状态">
                    {getFieldDecorator('status',{
                        initialValue : "ON_SALE",
                        rules: [
                            { required: true, message: '请选择商品状态' },
                        ],
                    })(
                        <Select placeholder="请选择商品状态">
                            <Select.Option value="ON_SALE">在售</Select.Option>
                            <Select.Option value="OUT_SALE">下架</Select.Option>
                        </Select>
                    )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="零售价">
                        {getFieldDecorator('retailPrice')(
                            <Input placeholder="请输入零售价格" />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="生产地">
                        {getFieldDecorator('producingArea')(
                            <Input placeholder="请输入生产地" />
                        )}
                    </Form.Item>
                    <Form.Item 
                        {...formItemLayout}
                        label="供应商"
                    >
                        {getFieldDecorator('supplierId',{
                            rules : [
                                {required : true, message : "请选择供应商"}
                            ]
                        })(
                        <Select placeholder="请选择供应商">
                            {
                            supplierList.map((item, index)=>(
                                <Select.Option key={index} value={item.get("id")}>{item.get("name")}</Select.Option>
                            ))
                            }
                        </Select>
                        )}
                    </Form.Item>
                    <Divider orientation="left">商品轮播图:</Divider>
                    <PicturesWall
                        pictures={this.state.picsList}
                        changePicsList={this.changePicsList.bind(this)}
                        removePicsList={this.removePicsList.bind(this)}
                        uploadUrl={api_goods_picture_upload}   
                    ></PicturesWall>
                    <Divider orientation="left">商品列表图:</Divider>
                    <PicturesWall
                        pictures={this.state.listPics}
                        changePicsList={this.changeListPics.bind(this)}
                        removePicsList={this.removePicsList.bind(this)}
                        uploadUrl={api_goods_picture_upload}   
                    ></PicturesWall>
                    
                </Form>
            </Fragment>
        )
    }
}
const WrappedGoodsInfoForm = Form.create({
    //当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange(props, changedFields) {
        // console.log(props, changedFields)
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
            retailPrice: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "retailPrice"])
            }),
            briefDescription: Form.createFormField({
                value: props.goodsInfo.getIn(["goods", "briefDescription"])
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
        // console.log(changedValues)
    },
    
})(GoodsInfoForm);

const mapStateToProps = (state) => ({
    goodsInfo: state.getIn(["goods", "goodsInfo"]),
    supplierList: state.getIn(["goods", "supplierList"]),
    goodsPicsList: state.getIn(["goods", "goodsPicsList"]),
    categoryList : state.getIn(["goods", "categoryList"])
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