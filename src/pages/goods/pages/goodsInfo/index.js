import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import WrappedGoodsInfoForm from "../../components/goodsInfoForm";
import { Button } from "antd";
import { actionCreators as goodsActionCreators } from "../../../../store/modules/goods";


class GoodsInfo extends Component {
    componentDidMount(){
        const { getGoodsBasicInfo, getGoodsStocksInfo, getGoodsPicsList, clearGoodsInfo, getSupplierList } = this.props;
        getSupplierList()
        if(this.props.location.pathname === "/goodsmanage/addgoods"){
            clearGoodsInfo()
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
    handleSave= ()=>{this.formRef.handleSubmit()}
    render() {
        return (
            <Fragment>
                <WrappedGoodsInfoForm 
                    wrappedComponentRef={(inst) => this.formRef = inst}
                ></WrappedGoodsInfoForm>
                <Button onClick={()=>{this.handleSave()}}>{this.props.location.pathname === "/goodsmanage/addgoods"?"新增":"保存"}</Button>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({
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
    //获取供应商列表信息
    getSupplierList(){
        dispatch(goodsActionCreators.getSupplierList())
    },
    //获取商品图片信息
    getGoodsPicsList(goodsId){
        dispatch(goodsActionCreators.getGoodsPicsList(goodsId))
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsInfo));