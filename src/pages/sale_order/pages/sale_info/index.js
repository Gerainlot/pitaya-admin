import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import SaleOrderInfoForm from "../../components/saleOrderInfoForm";
import { actionCreators as saleActionCreator } from "../../../../store/modules/sale_order";


class SaleOrderInfo extends Component {
    componentDidMount(){
        const { getInfo } = this.props;
        getInfo(this.props.match.params.id)
    }
    //点击保存
    handleSave= () => {
        this.formRef.handleSubmit()
    }

    render() {
        const {saleOrderInfo} = this.props
        return (
            <Fragment>
                <SaleOrderInfoForm info={saleOrderInfo.toJS()}></SaleOrderInfoForm>
                {/* <Button onClick={()=>{this.handleSave()}}>{this.props.location.pathname === "/goodsmanage/addgoods"?"新增":"保存"}</Button> */}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    saleOrderInfo: state.getIn(["sale","saleOrderInfo"]),
})
const mapDispatchToProps = (dispatch) => ({
    // 获取订单详情
    getInfo(id){
        dispatch(saleActionCreator.querySaleOrderInfo({"id":id}))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderInfo);