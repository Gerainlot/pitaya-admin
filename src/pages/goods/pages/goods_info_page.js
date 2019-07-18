import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import WrappedGoodsInfoForm from "../components/goodsInfoForm/";
import WrappedDynamicFieldSet from '../components/goodsInfoForm/dynamic_spec_form'
import GoodsEditor from '../components/goodsInfoForm/goods_editor'
import { Button,Divider, Row, Col } from "antd";
import { actionCreators as goodsActionCreators } from "../../../store/modules/goods";

const goods_add_path = "/goodsmanage/addgoods"

class GoodsInfo extends Component {

    componentDidMount(){
        const {
            getGoodsBasicInfo,
            getGoodsStocksInfo,
            getGoodsPicsList, 
            clearGoodsInfo,
            clearGoodsPics,
            getSupplierList,
            getAllCategories
            } = this.props;
        getAllCategories()
        getSupplierList()
        if(this.props.location.pathname === goods_add_path){
            clearGoodsInfo()
            clearGoodsPics()
        }else{
            //获取商品基本信息
            getGoodsBasicInfo(this.props.match.params.goodsId)
            //获取商品库存信息
            getGoodsStocksInfo(this.props.match.params.goodsId)
            //获取商品图片信息
            getGoodsPicsList(this.props.match.params.goodsId)
        }
    }
    //点击保存
    handleSave = ()=> {
        let goods = {}
        const {listPics,picsList} = this.goodsBasicForm.state
        const goodsPicIds = picsList.map(element => element.id )
        this.goodsBasicForm.props.form.validateFieldsAndScroll((err, values) => {
            goods = this.newGoods(values,goodsPicIds)
        })
        this.specificationForm.props.form.validateFieldsAndScroll((err, values) => {
            let goodsSpecs = values.specifications
            if (goodsSpecs) {
                goodsSpecs = goodsSpecs.map((element,index) => {
                    element.picUrl = values.pictures[index]
                    return element
                });
            }
            goods.specifications = goodsSpecs
        })
        if (listPics && listPics.length > 0){
            goods.listPicUrl = this.extractUrlFromFile(listPics[0])
        }
        goods.description = this.goodsEditorRef.state.html
        console.log("-- 待提交商品数据 -- :",goods)
        if (this.props.location.pathname === goods_add_path){
            this.props.addGoods(goods,() => {})
        }else {
            goods.id = this.props.match.params.goodsId
            this.props.updateGoods(goods,() => {})
        }
        
    }

    extractUrlFromFile(file) {
        if (file.response){
            return file.response.data[0].path
        }else {
            return file.url
        }
        
    }

    newGoods = (values,pictureIds) => {
        //新增商品
        const goods = {
            name: values.name,
            categoryId: values.category,
            producingArea: values.producingArea,
            retailPrice : values.retailPrice,
            briefDescription : values.briefDescription,
            description : values.description,
            stocks: values.stocks,
            supplierId: values.supplierId,
            status : values.status,
            pictureIds
        }
        return goods
    }
    render() {
        return (
            <Fragment>
                <WrappedGoodsInfoForm 
                    wrappedComponentRef={(inst) => this.goodsBasicForm = inst}
                ></WrappedGoodsInfoForm>
                <Divider orientation="left">规格定义:</Divider>
                <WrappedDynamicFieldSet 
                    wrappedComponentRef={(inst) => this.specificationForm = inst}
                ></WrappedDynamicFieldSet>
                <GoodsEditor 
                  wrappedComponentRef={(inst) => this.goodsEditorRef = inst}
                />
                <Row gutter={24}>
                    <Col offset={4} span={20}>
                        <Button type="primary" onClick={()=>{this.handleSave()}}>
                            {this.props.location.pathname === goods_add_path? "新增" : "保存"}
                        </Button>
                    </Col>
                </Row>
                
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({
    //新增商品信息
    addGoods(goods, callBack){
        dispatch(goodsActionCreators.addGood(goods, callBack))
    },
    updateGoods(goods,callBack) {
        dispatch(goodsActionCreators.updateGoods(goods, callBack))
    },
    //获取商品基本信息
    getGoodsBasicInfo(goodsId){
        dispatch(goodsActionCreators.getGoodsBasicInfo(goodsId))
    },
    //获取商品库存信息
    getGoodsStocksInfo(goodsId){
        dispatch(goodsActionCreators.getGoodsStocksInfo(goodsId))
    },
    //清除商品信息
    clearGoodsInfo(){
        dispatch(goodsActionCreators.clearGoodsInfo())
    },
    clearGoodsPics(){
        dispatch(goodsActionCreators.clearGoodsPics())
    },
    //获取供应商列表信息
    getSupplierList(){
        dispatch(goodsActionCreators.getSupplierList())
    },
    //获取商品图片信息
    getGoodsPicsList(goodsId){
        dispatch(goodsActionCreators.getGoodsPicsList(goodsId))
    },
    // 获取所有分类
    getAllCategories(){
        dispatch(goodsActionCreators.getAllCategories())
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsInfo));